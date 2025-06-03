import socketio
from flask import Flask, jsonify, request
from flask_cors import CORS
import eventlet
from influxdb_client import InfluxDBClient, Point, WritePrecision

# Maak Flask-app
app = Flask(__name__)
CORS(app)  # CORS toestaan

# Maak Socket.IO-server met CORS support
sio = socketio.Server(cors_allowed_origins="*")
app.wsgi_app = socketio.WSGIApp(sio, app.wsgi_app)

new_data = {}

# Socket.IO events
@sio.event
def connect(sid, environ):
    print(f"Client verbonden: {sid}")

@sio.event
def disconnect(sid):
    print(f"Client ontkoppeld: {sid}")

@sio.event
def new_data_event(sid, data):
    global new_data
    print(f"Ontvangen data van client: {data}")
    new_data = data
    sio.emit("new_data", data)

# REST API routes
@app.route("/")
def home():
    return "<h1>Flask Socket.IO Server draait</h1>"

# InfluxDB configuratie
INFLUXDB_URL = "http://192.168.1.108:8086"
INFLUXDB_TOKEN = "API"
INFLUXDB_ORG = "Home_Assist"
INFLUXDB_BUCKET = "Sleepingroom"

@app.route("/api/data", methods=["POST"])
def add_data():
    global new_data
    new_data = request.get_json()
    sio.emit("new_data", new_data)  # Stuur naar clients

    try:
        with InfluxDBClient(url=INFLUXDB_URL, token=INFLUXDB_TOKEN, org=INFLUXDB_ORG) as client:
            write_api = client.write_api()
            point = Point("sensor_data") \
                .field("humidity", float(new_data.get("humidity", 0))) \
                .field("temp", float(new_data.get("temp", 0))) \
                .time(None, WritePrecision.NS)
            write_api.write(bucket=INFLUXDB_BUCKET, org=INFLUXDB_ORG, record=point)
            write_api.__del__()  # Alleen als echt nodig, normaal niet nodig
    except Exception as e:
        print(f"Fout bij schrijven naar InfluxDB: {e}")

    return jsonify(new_data), 201

@app.route("/api/data", methods=["GET"])
def get_data():
    return jsonify(new_data)

@app.route("/api/daydata", methods=["GET"])
def get_day_data():
    from datetime import datetime

    date_str = request.args.get("date")
    if not date_str:
        return jsonify({"error": "Missing 'date' parameter. Use format YYYY-MM-DD."}), 400

    try:
        # Maak tijdsrange op basis van opgegeven dag
        start = f"{date_str}T00:00:00Z"
        stop = f"{date_str}T23:59:59Z"

        with InfluxDBClient(url=INFLUXDB_URL, token=INFLUXDB_TOKEN, org=INFLUXDB_ORG) as client:
            query_api = client.query_api()

            query = f'''
            from(bucket: "{INFLUXDB_BUCKET}")
              |> range(start: {start}, stop: {stop})
              |> filter(fn: (r) => r._measurement == "sensor_data")
              |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
              |> sort(columns: ["_time"])
            '''

            tables = query_api.query(org=INFLUXDB_ORG, query=query)

            temp_data = []
            hum_data = []
            x_labels = []

            for table in tables:
                for row in table.records:
                    temp = row.values.get("temp")
                    hum = row.values.get("humidity")
                    ts = row.get_time().strftime("%H:%M")

                    if temp is not None and hum is not None:
                        temp_data.append(temp)
                        hum_data.append(hum)
                        x_labels.append(ts)

            if not temp_data and not hum_data:
                return jsonify({"tempData": [], "humData": [], "xLabels": [], "message": "No data found for that day."}), 200

            return jsonify({
                "tempData": temp_data,
                "humData": hum_data,
                "xLabels": x_labels
            }), 200

    except Exception as e:
        print(f"Fout bij ophalen dagdata: {e}")
        return jsonify({"error": "Serverfout bij ophalen van data"}), 500


# Start server via eventlet
if __name__ == "__main__":
    eventlet.wsgi.server(eventlet.listen(('0.0.0.0', 5000)), app)

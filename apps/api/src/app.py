import socketio
from flask import Flask, jsonify, request
from flask_cors import CORS
import eventlet

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

@app.route("/api/data", methods=["POST"])
def add_data():
    global new_data
    new_data = request.get_json()
    sio.emit("new_data", new_data)  # Stuur naar clients
    return jsonify(new_data), 201

@app.route("/api/data", methods=["GET"])
def get_data():
    return jsonify(new_data)

# Start server via eventlet
if __name__ == "__main__":
    eventlet.wsgi.server(eventlet.listen(('0.0.0.0', 5000)), app)

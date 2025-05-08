import socketio
from flask import Flask, jsonify, request

# Initialiseer de Flask-app
app = Flask(__name__)

# Initialiseer de Socket.IO-server
sio = socketio.Server()

# Voeg de Socket.IO-server toe aan de Flask-app
app.wsgi_app = socketio.WSGIApp(sio, app.wsgi_app)

new_data = {}


# Event handler voor wanneer een client verbinding maakt
@sio.event
def connect(sid, environ):
    print(f"Client verbonden: {sid}")


# Event handler voor wanneer een client disconnect
@sio.event
def disconnect(sid):
    print(f"Client ontkoppeld: {sid}")


# Event handler voor het ontvangen van de data van de client
@sio.event
def new_data_event(sid, data):
    print(f"Ontvangen data: {data}")
    # Voeg de ontvangen data toe aan de globale data
    global new_data
    new_data = data


@app.route("/")
def home():
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Flask-Socket.IO Server</title>
    </head>
    <body>
        <h1>Welcome to the Flask Socket.IO Server!</h1>
    </body>
    </html>
    """


@app.route("/api/data", methods=["POST"])
def add_data():
    global new_data
    new_data = request.get_json()

    # Emit de data naar alle verbonden clients via Socket.IO
    sio.emit("new_data", new_data)
    return jsonify(new_data), 201


@app.route("/api/data", methods=["GET"])
def get_data():
    global new_data
    return jsonify(new_data)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

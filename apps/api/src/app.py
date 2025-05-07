from flask import Flask, jsonify, request

app = Flask(__name__)

new_data = {}


@app.route("/")
def home():
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Welcome</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
                margin-top: 50px;
            }
            h1 {
                color: #4CAF50;
            }
            p {
                color: #555;
            }
        </style>
    </head>
    <body>
        <h1>Welcome to the Flask API!</h1>
        <p>This is a simple API built with Flask.</p>
        <p>Use the endpoints to interact with the application.</p>
    </body>
    </html>
    """


@app.route("/api/data", methods=["POST"])
def add_data():
    global new_data
    new_data = request.get_json()
    return jsonify(new_data), 201


@app.route("/api/data", methods=["GET"])
def get_data():
    global new_data
    return jsonify(new_data)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

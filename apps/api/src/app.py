from flask import Flask, jsonify, request

app = Flask(__name__)

new_data = {}


@app.route("/")
def home():
    return "Welcome to the API!"


@app.route("/api/data", methods=["POST"])
def add_data():
    new_data = request.get_json()
    return jsonify(new_data), 201


@app.route("/api/data", methods=["GET"])
def get_data():
    new_data = {"name": "John Doe", "age": 30, "city": "New York"}
    return jsonify(new_data)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

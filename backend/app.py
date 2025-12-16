from flask import Flask, request, jsonify
from flask_cors import CORS
from product import Product
from db import add_product, get_products_by_drawer, get_all_products, delete_product
from bson import ObjectId

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return {"message": "Backend running!"}

# --- Helper: Convert ObjectId to string ---
def convert_mongo_doc(doc):
    doc["_id"] = str(doc["_id"])
    return doc

@app.route("/add", methods=["POST"])
def add_item():
    data = request.json
    name = data.get("name")
    category = data.get("category")
    expiry = data.get("expiry")
    drawer = data.get("drawer")

    product = Product(name, category, expiry, drawer)
    add_product(product.to_dict())
    
    return jsonify({"message": "Product added successfully"})

@app.route("/drawer/<drawer>", methods=["GET"])
def list_drawer(drawer):
    items = get_products_by_drawer(drawer)

    # Convert ObjectId in each item
    items = [convert_mongo_doc(i) for i in items]

    return jsonify(items)

@app.route("/all", methods=["GET"])
def list_all():
    items = get_all_products()

    # Convert ObjectId for all documents
    items = [convert_mongo_doc(i) for i in items]

    return jsonify(items)

@app.route("/delete/<name>", methods=["DELETE"])
def remove_item(name):
    delete_product(name)
    return jsonify({"message": f"{name} removed."})

if __name__ == "__main__":
    app.run(debug=True)

    

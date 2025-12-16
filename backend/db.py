from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()  # load .env values

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

products_collection = db["products"]

def add_product(product_dict):
    return products_collection.insert_one(product_dict)

def get_products_by_drawer(drawer):
    return list(products_collection.find({"drawer": drawer}))

def get_all_products():
    return list(products_collection.find({}))

def delete_product(name):
    return products_collection.delete_one({"name": name})


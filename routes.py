from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
from functools import lru_cache

load_dotenv()

app = Flask(__name__)

reviews = []

@app.route('/')
def index():
    return "Welcome to the Book Review App!"

@app.route('/reviews', methods=['GET', 'POST'])
def handle_reviews():
    if request.method == 'GET':
        return jsonify(reviews), 200
    elif request.method == 'POST':
        return add_review(request.json)

def add_review(review):
    reviews.append(review)
    clear_caches()
    return jsonify({"message": "Review added successfully!"}), 201

@app.route('/reviews/<int:review_id>', methods=['GET', 'PUT', 'DELETE'])
def review_operations(review_id):
    if review_id > get_reviews_length() or review_id < 1:
        return jsonify({"error": "Review not found"}), 404
    
    if request.method == 'GET':
        return get_review(review_id)
    elif request.method == 'PUT':
        return update_review(review_id, request.json)
    elif request.method == 'DELETE':
        return delete_review(review_id)

def get_review(review_id):
    return jsonify(reviews[review_id - 1]), 200

def update_review(review_id, review_data):
    reviews[review_id - 1] = review_data
    clear_caches()
    return jsonify({"message": "Review updated successfully!"}), 200

def delete_review(review_id):
    reviews.pop(review_id - 1)
    clear_caches()
    return jsonify({"message": "Review deleted successfully!"}), 200

@lru_cache(maxsize=32)
def get_reviews_length():
    return len(reviews)

def clear_caches():
    get_reviews_length.cache_clear()

if __name__ == "__main__":
    app.run(debug=True, host=os.getenv('HOST', '127.0.0.1'), port=int(os.getenv('PORT', 5000)))
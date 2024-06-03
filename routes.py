from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

reviews = []

@app.route('/')
def index():
    return "Welcome to the Book Review App!"

@app.route('/reviews', methods=['GET', 'POST'])
def handle_reviews():
    if request.method == 'GET':
        return jsonify(reviews)
    elif request.method == 'POST':
        review = request.json
        reviews.append(review)
        return jsonify({"message": "Review added successfully!"}), 201

@app.route('/reviews/<int:review_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_review(review_id):
    if review_id > len(reviews) or review_id < 1:
        return jsonify({"error": "Review not found"}), 404
    
    if request.method == 'GET':
        return jsonify(reviews[review_id - 1])
    elif request.method == 'PUT':
        review = request.json
        reviews[review_id - 1] = review
        return jsonify({"message": "Review updated successfully!"})
    elif request.method == 'DELETE':
        reviews.pop(review_id - 1)
        return jsonify({"message": "Review deleted successfully!"})

if __name__ == "__main__":
    app.run(debug=True, host=os.getenv('HOST', '127.0.0.1'), port=int(os.getenv('PORT', 5000)))
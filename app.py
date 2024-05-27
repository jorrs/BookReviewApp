from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

books_db = [
    {"id": 1, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "reviews": []},
    {"id": 2, "title": "To Kill a Mockingbird", "author": "Harper Lee", "reviews": []}
]

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Book Review App!"})

@app.route('/books', methods=['GET'])
def get_books():
    return jsonify(books_db)

@app.route('/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    book = next((book for book in books_db if book['id'] == book_id), None)
    if book:
        return jsonify(book)
    else:
        return jsonify({"message": "Book not found"}), 404

@app.route('/books/<int:book_id>/review', methods=['POST'])
def add_review(book_id):
    book = next((book for book in books_db if book['id'] == book_id), None)
    if book:
        review = request.json
        book['reviews'].append(review)
        return jsonify({"message": "Review added successfully."}), 201
    else:
        return jsonify({"message": "Book not found"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)
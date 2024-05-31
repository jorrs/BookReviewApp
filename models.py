from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Book(db.Model):
    __tablename__ = 'books'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    reviews = db.relationship('Review', backref='book', lazy=True)

    def to_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'author': self.author,
            'description': self.description,
            'reviews': [review.to_json() for review in self.reviews]
        }


class Review(db.Model):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)
    reviewer_name = db.Column(db.String(100), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=True)

    def to_json(self):
        return {
            'id': self.id,
            'book_id': self.book_id,
            'reviewer_name': self.reviewer_name,
            'rating': self.rating,
            'comment': self.comment
        }


@app.route('/books', methods=['POST'])
def create_book():
    data = request.get_json()
    new_book = Book(
        title=data['title'],
        author=data['author'],
        description=data.get('description')
    )
    db.session.add(new_book)
    db.session.commit()
    return jsonify(new_book.to_json()), 201


@app.route('/books/<int:book_id>/reviews', methods=['POST'])
def create_review(book_id):
    book = Book.query.get(book_id)
    if not book:
        return jsonify({'message': 'Book not found'}), 404

    data = request.get_json()
    new_review = Review(
        book_id=book_id,
        reviewer_name=data['reviewer_name'],
        rating=data['rating'],
        comment=data.get('comment')
    )
    db.session.add(new_review)
    db.session.commit()
    return jsonify(new_review.to_json()), 201


@app.route('/books/<int:book_id>/reviews/<int:review_id>', methods=['PUT'])
def update_review(book_id, review_id):
    review = Review.query.get(review_id)
    if not review or review.book_id != book_id:
        return jsonify({'message': 'Review not found or does not belong to this book'}), 404

    data = request.get_json()
    review.reviewer_name = data.get('reviewer_name', review.reviewer_name)
    review.rating = data.get('rating', review.rating)
    review.comment = data.get('comment', review.comment)
    
    db.session.commit()
    return jsonify(review.to_json()), 200


@app.route('/books', methods=['GET'])
def get_books():
    search = request.args.get('search')
    if search:
        books = Book.query.filter(Book.title.ilike(f'%{search}%') | Book.author.ilike(f'%{search}%')).all()
    else:
        books = Book.query.all()
    return jsonify([book.to_json() for book in books]), 200


@app.route('/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    book = Book.query.get(book_id)
    if book:
        return jsonify(book.to_json()), 200
    return jsonify({'message': 'Book not found'}), 404


if __name__ == '__main__':
    app.run(debug=True)
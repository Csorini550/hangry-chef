from .db import db
from sqlalchemy.orm import relationship, backref


class Review(db.Model):
    __tablename__ = 'reviews'
    # __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key = True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'))
    review = db.Column(db.String)
    rating = db.Column(db.Float)

    employee = relationship('Employee', back_populates='reviews')
    customer = relationship('Customer', back_populates='reviews')

    def to_dict(self):
      return {
        'id': self.id,
        'customer_id': self.customer_id,
        'employee_id': self.employee_id,
        'review': self.review,
        'rating': self.rating
      }
from .db import db
from sqlalchemy.orm import relationship, backref




class Customer(db.Model):
    __tablename__ = 'customers'
    # __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key = True)
    table_number = db.Column(db.Integer)
    # food_or_drink_customer_id = db.Column(db.Integer, db.ForeignKey('food_or_drink_customers.id '))
    tipp = db.Column(db.Float)
    total_price = db.Column(db.Float)
    server_review = db.Column(db.String)
    server_rating = db.Column(db.Float)
    order_issue = db.Column(db.String)
    instagram = db.Column(db.Boolean)

    # tip = relationship('Tip', backref='customers')
    table = db.relationship("Table", back_populates="customers")
    review = relationship('Review', back_populates='customers')
    food_or_drink = relationship("Food_or_drink", secondary=food_or_drink_customers, back_populates='customers')

    def to_dict(self):
      return {
        'id': self.id,
        'table_number': self.table_number,
        'food_or_drink_customer_id': self.food_or_drink_customer_id,
        'tipp': self.tipp,
        'total_price': self.total_price,
        'server_review': self.server_review,
        'server_rating': self.server_rating,
        'order_issue': self.order_issue,
        'instagram': self.instagram
      }

class Food_or_drink_customer(db.Model):
    __tablename__ = 'food_or_drink_customers'
    # __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key = True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))
    food_or_drink_id = db.Column(db.Integer, db.ForeignKey('food_or_drinks.id'))

    customer = relationship(Customer, backref=backref('food_or_drink_customers', cascade='all, delete-orphan'))
    food_or_drink = relationship(Food_or_drink, backref=backref('food_or_drink_customers', cascade='all, delete-orphan'))

    def to_dict(self):
      return {
        'id': self.id,
        'customer_id': self.customer_id,
        'food_or_drink_id': self.food_or_drink_id
      }
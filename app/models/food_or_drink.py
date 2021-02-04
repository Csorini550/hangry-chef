x from .db import db
from sqlalchemy.orm import relationship, backref

class Food_or_drink(db.Model):
    __tablename__ = 'food_or_drinks'
    # __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key = True)
    menue_id = db.Column(db.Integer, db.ForeignKey('menues.id'))
    name = db.Column(db.String, nullable = False)
    price = db.Column(db.Float, nullable = False)
    picture = db.Column(db.String)

  #many to many 
    customers = relationship('Customer', secondary=food_or_drink_customers, back_populates="food_or_drinks")
    menues = db.relationship("Menu", secondary=menue_food_or_drinks, back_populates="food_or_drinks")
    tables = db.relationship('Table', secondary=table_food_or_drinks, back_populates="food_or_drinks")
    ingredients = db.relationship('Ingredient', secondary=ingredient_food_or_drinks, back_populates="food_or_drinks")

    def to_dict(self):
      return {
        'id': self.id,
        'menue_id': self.menue_id,
        'name': self.name,
        'price': self.price,
        'picture': self.picture,
      }

#many to many between foods and menues
menue_food_or_drinks = db.Table(
  "menue_food_or_drinks", 
  db.Column(
    "menue_id",
    db.Integer,
    db.ForeignKey("menues.id"),
    primary_key = True)),
    db.Column(
      "food_or_drink_id",
      db.Integer,
      db.ForeignKey("food_or_drinks.id"), 
      primary_key = True) 

  

#many to many between customer and foods
food_or_drink_customers = db.Table(
  "food_or_drink_customers", 
  db.Column(
    "customer_id",
    db.Integer,
    db.ForeignKey("customers.id"),
    primary_key = True)
    ),
db.Column(
  "food_or_drink_id",
  db.Integer,
  db.ForeignKey("food_or_drinks.id"),
  primary_key = True
)


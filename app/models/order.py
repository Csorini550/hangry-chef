# from .db import db
# from sqlalchemy.orm import relationship, backref


# class Order(db.Model):
#     __tablename__ = 'orders'

#     id = db.Column(db.Integer, primary_key=True)
#     food_or_drink_id = db.Column(
#         db.Integer, db.ForeignKey('food_or_drinks.id'))

#     customers = db.relationship(
#         'Customer', secondary="food_or_drink_customers", back_populates="orders")
#     ingredients = db.relationship(
#         'Ingredient', secondary="ingredient_food_or_drinks", back_populates="orders")
#     tables = db.relationship(
#         'Table', secondary="table_food_or_drinks", back_populates="orders")

#     def to_dict(self):
#         return {
#             "id": self.id,
#             food_or_drink_id: self.food_or_drink_id
#         }

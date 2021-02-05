from .db import db
from sqlalchemy.orm import relationship, backref


class Inventory(db.Model):
    __tablename__ = 'inventories'
    # __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key = True)
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredients.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    food_item = db.Column(db.String)
    quantity = db.Column(db.Float, nullable = False)
    market_price = db.Column(db.Float)

    users = relationship('User', back_populates='inventories')
    ingredients = relationship('Ingredient', back_populates='inventories')

    def to_dict(self):
      return {
        'id': self.id,
        'ingredient_id': self.ingredient_id,
        'user_id': self.user_id,
        'food_or_drink': self.food_or_drink_id,
        'food_item': self.food_item,
        'quantity': self.quantity,
        'market_price': self.market_price
      }
from .db import db
from sqlalchemy.orm import relationship, backref


class Ingredient(db.Model):
    __tablename__ = 'ingredients'
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String, nullable = False)
    price = db.Column(db.Float)
    picture = db.Column(db.String)

#many to many for foods and ingredients
    food_or_drinks = db.relationship('Food_or_drink', secondary="ingredient_food_or_drinks", back_populates="ingredients")

    users = db.relationship('User', back_populates='ingredients')
    inventories = db.relationship('Inventory', back_populates='ingredients')

    def to_dict(self):
      return {
        'id': self.id,
        'user_id': self.user_id,
        'name': self.name,
        'price': self.price,
        'picture': self.picture
      }




#todo

    # def to_dict(self):
    #   return {
    #     'id': self.id,
    #     'food_or_drink_id': self.food_or_drink_id,
    #     'ingredient_id': self.ingredient_id
    #   }
    # __tablename__ = 'ingredient_food_or_drinks'
    # # __table_args__ = {'extend_existing': True}

    # id = db.Column(db.Integer, primary_key = True)
    # food_or_drink_id = db.Column(db.Integer, db.ForeignKey('food_or_drinks.id'))
    # ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredients.id'))

    # ingredients = db.relationship(Ingredient, backref=backref('ingredient_food_or_drinks', cascade='all, delete-orphan'))
    # food_or_drinks = db.relationship(Food_or_drink, backref=backref('ingredient_food_or_drinks', cascade='all, delete-orphan'))


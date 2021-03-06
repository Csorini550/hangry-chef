from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .db import db
from sqlalchemy.orm import relationship, backref


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    # __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    restaurant_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    tables = db.relationship("Table", back_populates="users")
    menues = db.relationship("Menue", back_populates="users")
    employees = db.relationship("Employee", back_populates="users")
    ingredients = db.relationship("Ingredient", back_populates="users")
    inventories = db.relationship("Inventory", back_populates="users")
    menu_lists = db.relationship("Menu_list", back_populates="users")
    # food_or_drinks = db.relationship("Food_or_drink", back_populates="users")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "restaurant_name": self.restaurant_name,
            "inventory": [item.to_dict() for item in self.inventories]
        }


def seed_users():
    # user
    demo = User(
        email='demo@aa.io',
        password='password',
        name='demo',
        restaurant_name="Demo restaurant"
    )

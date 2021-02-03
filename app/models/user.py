from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .db import db
from sqlalchemy.orm import relationship, backref

class User(db.Model, UserMixin):
  __tablename__ = 'users'
  __table_args__ = {'extend_existing': True}

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String, nullable = False)
  restaurant_name = db.Column(db.String, nullable = False)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)

  menue = db.relationship("Menue", backref="users")


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
      "restaurant_name": self.restaurant_name,
      "name": self.name,
      "email": self.email
    }
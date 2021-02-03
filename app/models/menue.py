from .db import db
from sqlalchemy.orm import relationship, backref

class Menue(db.Model):
    __tablename__ = 'menues'
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    menue_name = db.Column(db.String, nullable = False)
    food_item = db.Column(db.String, nullable = False)
    qr_code = db.Column(db.String)
    picture = db.Column(db.String)


    user = db.relationship("User", backref="menue")

    def to_dict(self):
      return {
        "id": self.id,
        "user_id": self.user_id,
        "menue_name": self.menue_name,
        "food_item": self.food_item,
        "qr_code": self.email,
        "picture": self.picture
      }
from .db import db
from sqlalchemy.orm import relationship, backref


class Menu_list(db.Model):
    __tablename__ = "menu_lists"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    menu_list = db.Column(db.String)
    food_or_drink_list = db.Column(db.String)

    users = relationship('User', back_populates='menu_lists')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "menu_list": self.menu_list,
            "food_or_drink_list": self.food_or_drink_list
        }

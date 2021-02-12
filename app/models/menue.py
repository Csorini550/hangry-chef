from .db import db
from sqlalchemy.orm import relationship, backref


class Menue(db.Model):
    __tablename__ = 'menues'
    # __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    menue_name = db.Column(db.String)
    food_item = db.Column(db.String)
    menue_array = db.Column(db.String)
    qr_code = db.Column(db.String)
    picture = db.Column(db.String)

# many to many between foods and menues
    food_or_drinks = db.relationship(
        "Food_or_drink", secondary="menue_food_or_drinks", back_populates="menues")

    users = db.relationship('User', back_populates='menues')
    qr_codes = db.relationship('Qr_code', back_populates='menues')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'menue_name': self.menue_name,
            'food_item': self.food_item,
            'menue_array': self.menue_array,
            'qr_code': self.qr_code,
            'picture': self.picture
        }

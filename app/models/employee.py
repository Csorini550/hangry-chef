from .db import db
from sqlalchemy.orm import relationship, backref

class Employee(db.Model):
    __tablename__ = 'employees'
    # __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    first_name = db.Column(db.String, nullable = False)
    last_name = db.Column(db.String, nullable = False)
    salary = db.Column(db.Float, nullable = False)
    table_number = db.Column(db.Integer)
    picture = db.Column(db.String)

    # reviews = db.relationship("Review", back_populates="employees")
    user = db.relationship('User', back_populates='employees')
    tables = db.relationship("Table", back_populates="employees")

    def to_dict(self):
      return {
        'id': self.id,
        'user_id': self.user_id,
        'first_name': self.first_name,
        'last_name': self.last_name,
        'salary': self.salary,
        'table_number': self.tables,
        'picture': self.picture
      }
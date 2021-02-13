from .db import db
from sqlalchemy.orm import relationship, backref


class Table(db.Model):
    __tablename__ = 'tables'
    # __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    table_number = db.Column(db.Integer, nullable=False)
    # customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'))

    # many to many between foods and tables
    food_or_drinks = db.relationship(
        "Food_or_drink", secondary="table_food_or_drinks", back_populates="tables")

    users = db.relationship("User", back_populates="tables")
    employees = db.relationship('Employee', back_populates='tables')
    # customers = db.relationship('Customer', back_populates='tables')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'table_number': self.table_number,
            # 'customer_id': self.customer_id,
            'employee_id': self.employee_id
        }

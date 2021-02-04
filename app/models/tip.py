from .db import db
from sqlalchemy.orm import relationship, backref




class Tip(db.Model):
    __tablename__ = 'tips'
    # __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key = True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'))
    tipp = db.Column(db.Float)
    
    employee = relationship('Employee', backref='tips')
    customers = relationship('Customer', backref='tips')

    def to_dict(self):
      return {
        'id': self.id,
        'customer_id': self.customer_id,
        'employee_id': self.employee_id,
        'tipp': self.tipp

      }
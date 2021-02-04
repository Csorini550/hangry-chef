from .db import db
from sqlalchemy.orm import relationship, backref



class Table(db.Model):
    __tablename__ = 'tables'
    # __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key = True)
    table_number = db.Column(db.Integer, nullable = False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'))

    #many to many between foods and tables
    food_or_drink = db.relationship("Food_or_drink", secondary="Table_food_or_drinks", back_populates="tables")


    employee = db.relationship('Employee', back_populates='tables')
    customer = db.relationship('Customer', back_populates='tables')
    

    def to_dict(self):
      return {
        'id': self.id,
        'table_number': self.table_number,
        'customer_id':self.customer_id,
        'employee_id': self.employee_id
      }

#todo Seeder
# table_food_or_drinks=db.Table(
#         "table_food_or_drinks",
#         db.Column(
#             "food_or_drink_id",
#             db.Integer,
#             db.ForeignKey("food_or_drinks.id"),
#             primary_key=True
#         ),
#         db.Column(
#             "table_id",
#             db.Integer,
#             db.ForeignKey("tables.id")
#         )
# )
      
      # def to_dict(self):
      #   return {
      #     'id': self.id,
      #     'table_id': self.table_id,
      #     'food_or_drink_id': self.food_or_drink_id
      #   }
from .db import db
from sqlalchemy.orm import relationship, backref
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'users'
#   __table_args__ = {'extend_existing': True}

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String, nullable = False)
  restaurant_name = db.Column(db.String, nullable = False)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)

  menue = db.relationship('Menue', backref='users', lazy=True)


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
      'id': self.id,
      'restaurant_name': self.restaurant_name,
      'name': self.name,
      'email': self.email
    }


#HELP - what should i store the menue array as
class Menue(db.Model):
    __tablename__ = 'menues'
    # __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    menue_name = db.Column(db.String, nullable = False)
    food_item = db.Column(db.String, nullable = False)
    menue_array = db.Column(db.String)
    qr_code = db.Column(db.String)
    picture = db.Column(db.String)


    # user = db.relationship('User', backref='menues')

    def to_dict(self):
      return {
        'id': self.id,
        'user_id': self.user_id,
        'menue_name': self.menue_name,
        'food_item': self.food_item,
        'qr_code': self.email,
        'menue_array': self.menue_array,
        'picture': self.picture
      }

class Qr_code(db.Model):
    __tablename__ = 'qr_codes'
    # __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key = True)
    menue_id = db.Column(db.Integer, db.ForeignKey('menues.id'))
    qr_code = db.Column(db.String, nullable=True)

    menue = db.relationship('Menue', backref='qr_codes')


    def to_dict(self):
        return {
            'id': self.id,
            'menue_id': self.menue_id,
            'qr_code': self.qr_code
        }


class Food_or_drink(db.Model):
    __tablename__ = 'food_or_drinks'
    # __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key = True)
    menue_id = db.Column(db.Integer, db.ForeignKey('menues.id'))
    name = db.Column(db.String, nullable = False)
    price = db.Column(db.Float, nullable = False)
    picture = db.Column(db.String)

    menue = db.relationship('Menue', backref='Food_or_drinks')
    table = db.relationship('Table', secondary='table_food_or_drinks')
    ingredient = db.relationship('Ingredient', secondary='ingredient_food_or_drinks')
    customer = relationship('Customer', secondary='food_or_drink_customers')

    def to_dict(self):
      return {
        'id': self.id,
        'menue_id': self.menue_id,
        'name': self.name,
        'price': self.price,
        'picture': self.picture,
      }

# help, is food_or drink_id wrong should it be to the joined table
class Ingredient(db.Model):
    __tablename__ = 'ingredients'
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # food_or_drink_id = db.Column(db.Integer, db.ForeignKey('food_or_drinks.id'), nullable = False)
    name = db.Column(db.String, nullable = False)
    price = db.Column(db.Float, nullable = False)
    picture = db.Column(db.String)

    food_or_drink = db.relationship('Food_or_drink', secondary='ingredient_food_or_drinks')
    user = db.relationship('User', backref='ingredients')
    def to_dict(self):
      return {
        'id': self.id,
        'user_id': self.user,
        'food_or_drink_id': self.food_or_drink_id,
        'name': self.name,
        'price': self.price,
        'picture': self.picture
      }

# Join table for food_or_drink and ingredient
class Ingredient_food_or_drink(db.Model):
    __tablename__ = 'ingredient_food_or_drinks'
    # __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key = True)
    food_or_drink_id = db.Column(db.Integer, db.ForeignKey('food_or_drinks.id'))
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredients.id'))

    ingredients = db.relationship(Ingredient, backref=backref('ingredient_food_or_drinks', cascade='all, delete-orphan'))
    food_or_drinks = db.relationship(Food_or_drink, backref=backref('ingredient_food_or_drinks', cascade='all, delete-orphan'))


    def to_dict(self):
      return {
        'id': self.id,
        'food_or_drink_id': self.food_or_drink_id,
        'ingredient_id': self.ingredient_id
      }


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

    user = db.relationship('User', backref='employees')

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

#DO I need this? #put back
class Table(db.Model):
    __tablename__ = 'tables'
    # __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key = True)
    table_number = db.Column(db.Integer, nullable = False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'))

    employee = relationship('Employee', backref='tables')
    food_or_drink = relationship('Food_or_drink', secondary='table_food_or_drinks')
    customer = relationship('Customer', backref='tables')

    def to_dict(self):
      return {
        'id': self.id,
        'table_number': self.table_number,
        'customer_id':self.customer_id,
        'employee_id': self.employee_id
      }



#Do i need a joiner, I don't thinks so -- (tables kind of suck)
class Inventory(db.Model):
    __tablename__ = 'inventories'
    # __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key = True)
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredients.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    food_item = db.Column(db.String, nullable = False)
    quantity = db.Column(db.Float, nullable = False)
    market_price = db.Column(db.Float)

    users = relationship('User', backref='inventories')
    ingredient = relationship('Ingredient', backref='inventories')

    def to_dict(self):
      return {
        'id': self.id,
        'ingredient_id': self.ingredient_id,
        'user_id': self.user_id,
        'food_or_drink': self.food_or_drink_id,
        'food_item': self.food_item,
        'quantity': self.quantity,
        'market_price': self.market_price
      }



class Review(db.Model):
    __tablename__ = 'reviews'
    # __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key = True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'))
    review = db.Column(db.String)
    rating = db.Column(db.Float)

    employee = relationship('Employee', backref='reviews')
    customer = relationship('Customer', backref='reviews')

    def to_dict(self):
      return {
        'id': self.id,
        'customer_id': self.customer_id,
        'employee_id': self.employee_id,
        'review': self.review,
        'rating': self.rating
      }


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

class Customer(db.Model):
    __tablename__ = 'customers'
    # __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key = True)
    table_number = db.Column(db.Integer)
    # food_or_drink_customer_id = db.Column(db.Integer, db.ForeignKey('food_or_drink_customers.id '))
    tipp = db.Column(db.Float)
    total_price = db.Column(db.Float)
    server_review = db.Column(db.String)
    server_rating = db.Column(db.Float)
    order_issue = db.Column(db.String)
    instagram = db.Column(db.Boolean)


    # tip = relationship('Tip', backref='customers')
    review = relationship('Review', backref='customers')
    food_or_drink = relationship('Food_or_drink', secondary='food_or_drink_customers')

    def to_dict(self):
      return {
        'id': self.id,
        'table_number': self.table_number,
        'food_or_drink_customer_id': self.food_or_drink_customer_id,
        'tipp': self.tipp,
        'total_price': self.total_price,
        'server_review': self.server_review,
        'server_rating': self.server_rating,
        'order_issue': self.order_issue,
        'instagram': self.instagram
      }

#Join table
class Food_or_drink_customer(db.Model):
    __tablename__ = 'food_or_drink_customers'
    # __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key = True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))
    food_or_drink_id = db.Column(db.Integer, db.ForeignKey('food_or_drinks.id'))

    customer = relationship(Customer, backref=backref('food_or_drink_customers', cascade='all, delete-orphan'))
    food_or_drink = relationship(Food_or_drink, backref=backref('food_or_drink_customers', cascade='all, delete-orphan'))

    def to_dict(self):
      return {
        'id': self.id,
        'customer_id': self.customer_id,
        'food_or_drink_id': self.food_or_drink_id
      }



class Table_food_or_drink(db.Model):
      __tablename__ = 'table_food_or_drinks'
      # __table_args__ = {'extend_existing': True}

      id = db.Column(db.Integer, primary_key = True)
      table_id = db.Column(db.Integer, db.ForeignKey('tables.id'))
      food_or_drink_id = db.Column(db.Integer, db.ForeignKey('food_or_drinks.id'))

      food_or_drink = relationship(Food_or_drink, backref=backref('table_food_or_drinks', cascade='all, delete-orphan' ) )
      table = relationship(Table, backref=backref('table_food_or_drinks', cascade='all, delete-orphan'))
      def to_dict(self):
        return {
          'id': self.id,
          'table_id': self.table_id,
          'food_or_drink_id': self.food_or_drink_id
        }


    


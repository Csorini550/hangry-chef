from .db import db
# RIP the dream big big_daddy_model from .big_daddy_model import User, Menue, Qr_code, Food_or_drink, Ingredient, Ingredient_food_or_drink, Employee, Table, Table_food_or_drink, Inventory, Review, Tip, Customer, Food_or_drink_customer
from .customer import Customer
from .employee import Employee
from .food_or_drink import Food_or_drink, menue_food_or_drinks, customer_food_or_drinks
from .ingredient import Ingredient, ingredient_food_or_drinks
from .inventory import Inventory
from .menue import Menue
from .qr_code import Qr_code
from .review import Review
from .table import Table, table_food_or_drinks
from .tip import Tip
from .user import User
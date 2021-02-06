from .db import db
from sqlalchemy.orm import relationship, backref


Menue_food_or_drinks = db.Table("menue_food_or_drinks", 
db.Column("menue_id",db.Integer,db.ForeignKey("menues.id"),primary_key = False),
db.Column("food_or_drink_id",db.Integer,db.ForeignKey("food_or_drinks.id"), primary_key = False))


Food_or_drink_customers = db.Table("food_or_drink_customers",
db.Column("customer_id",db.Integer,db.ForeignKey("customers.id"),primary_key = False),
db.Column("food_or_drink_id",db.Integer,db.ForeignKey("food_or_drinks.id"),primary_key = False))


Table_food_or_drinks= db.Table("table_food_or_drinks",
db.Column("food_or_drink_id",db.Integer,db.ForeignKey("food_or_drinks.id"),primary_key=False),
db.Column("table_id",db.Integer,db.ForeignKey("tables.id"), primary_key = False))

#ask that query to include food_or_drink model (google this look into includes)
#query on table id of this table would give me a list of all the table food pairs
# then query food or drink by id i got from above table


Ingredient_food_or_drinks = db.Table("ingredient_food_or_drinks",
db.Column("ingredient_id",db.Integer,db.ForeignKey("ingredients.id"),primary_key= False),
db.Column("food_or_drink_id",db.Integer,db.ForeignKey("food_or_drinks.id"),primary_key = False)) 










from flask_wtf import FlaskForm
from wtforms import StringField, TextField, SubmitField, IntegerField, Form, FloatField, RadioField, SelectField
from app.models import Inventory
from wtforms.validators import DataRequired


class NewInventoryForm(FlaskForm):
    ingredient_id = IntegerField("ingredient_id")
    user_id = IntegerField("user_id")
    food_item = TextField("food_item", validators=[DataRequired()])
    quantity = FloatField("quantity", validators=[DataRequired()])
    market_price = FloatField("market_price", validators=[DataRequired()])

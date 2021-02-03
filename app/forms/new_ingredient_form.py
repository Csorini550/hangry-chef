from flask_wtf import FlaskForm
from wtforms import StringField, TextField, SubmitField, IntegerField, Form, FloatField, RadioField, SelectField
from app.models import Ingredient
from wtforms.validators import DataRequired


class NewIngredientForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    food_or_drink_id = IntegerField("food_or_drink_id", validators=[DataRequired()])
    name = StringField("name", validators=[DataRequired()])
    price = FloatField("price", validators=[DataRequired()])
    picture = StringField("picture")
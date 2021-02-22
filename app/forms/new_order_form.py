from flask_wtf import FlaskForm
from wtforms import StringField, TextField, SubmitField, IntegerField, Form, FloatField, RadioField, SelectField
from app.models import Order
from wtforms.validators import DataRequired


class NewOrderForm(FlaskForm):
    food_or_drink_id = IntegerField("food_or_drink_id", validators=[DataRequired()])
    
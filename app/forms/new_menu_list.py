from flask_wtf import FlaskForm
from wtforms import StringField, TextField, SubmitField, IntegerField, Form, FloatField, RadioField, SelectField
from app.models import Menu_list
from wtforms.validators import DataRequired


class NewMenuListForm(FlaskForm):
    user_id = IntegerField("user_id")
    menu_list = StringField("menu_list")
    food_or_drink_list = StringField("food_or_drink_list")

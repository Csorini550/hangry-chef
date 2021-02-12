from flask_wtf import FlaskForm
from wtforms import StringField, TextField, SubmitField, IntegerField, Form, FloatField, RadioField, SelectField
from app.models import Food_or_drink
from wtforms.validators import DataRequired


class NewFoodOrDrinkForm(FlaskForm):
    menue_id = IntegerField("menue_id", validators=[DataRequired()])
    name = StringField("name", validators=[DataRequired()])
    price = FloatField("price", validators=[DataRequired()])
    picture = StringField("picture")
    description = StringField("description")

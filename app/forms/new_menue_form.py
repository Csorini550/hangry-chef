from flask_wtf import FlaskForm
from wtforms import StringField, TextField, SubmitField, IntegerField, Form, FloatField, RadioField, SelectField

from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Menue


class NewMenueForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    food_item = StringField("food_item", validators=[DataRequired()])
    menue_name = StringField("menue_name", validators=[DataRequired()])
    menue_array = StringField("menue_array")
    qr_code = StringField("qr_code")
    picture = StringField("picture")
from flask_wtf import FlaskForm
from wtforms import StringField, TextField, SubmitField, IntegerField, Form, FloatField, RadioField, SelectField

from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Menue


class NewMenueForm(FlaskForm):
    user_id = IntegerField

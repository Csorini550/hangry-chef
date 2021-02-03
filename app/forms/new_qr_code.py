from flask_wtf import FlaskForm
from wtforms import StringField, TextField, SubmitField, IntegerField, Form, FloatField, RadioField, SelectField

from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Qr_code

class NewQrCodeForm(FlaskForm):
    menue_id = IntegerField("menue_id")
    qr_code = StringField("qr_code")

from flask_wtf import FlaskForm
from wtforms import StringField, TextField, SubmitField, IntegerField, Form, FloatField, RadioField, BooleanField, SelectField
from app.models import Customer
from wtforms.validators import DataRequired


class NewCustomerForm(FlaskForm):
    table_number = IntegerField("table_number")
    tipp = FloatField("tipp")
    total_price = FloatField("total_price")
    server_review = StringField("server_review")
    server_rating = FloatField("server_rating")
    order_issue = StringField("order_issue")
    instagram = BooleanField("instagram")

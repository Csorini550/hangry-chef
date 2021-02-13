from flask_wtf import FlaskForm
from wtforms import StringField, TextField, SubmitField, IntegerField, Form, FloatField, RadioField, SelectField
from app.models import Table
from wtforms.validators import DataRequired


class NewTableForm(FlaskForm):
    table_number = IntegerField("table_number")
    # customer_id = IntegerField("customer_id")
    employee_id = IntegerField("employee_id")
    user_id = IntegerField("user_id")

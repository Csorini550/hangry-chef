from flask_wtf import FlaskForm
from wtforms import StringField, TextField, SubmitField, IntegerField, Form, FloatField, RadioField, SelectField
from app.models import Employee
from wtforms.validators import DataRequired


class NewEmployeeForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    first_name = StringField("first_name", validators=[DataRequired()])
    last_name = StringField("last_name", validators=[DataRequired()])
    salary = FloatField("salary", validators=[DataRequired()])
    table_number = IntegerField("table_number")
    picture = StringField("picture")

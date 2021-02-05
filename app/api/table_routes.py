from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Table
from app.forms import NewTableForm
from app.models import db


table_routes = Blueprint("table", __name__)


#GET ALL TABLES 
@table_routes.route("")
def all_tables():
    tables = Table.query.all()
    return {table.id: table.to_dict() for table in tables}


#GET by employee id
# @table_routes.route("")

@table_routes.route("/create", methods=["POST"])
@login_required
def new_table():
    form = NewTableForm()
    newTable = Table(
        table_number=form.data["table_number"]
        customer_id=form.data["customer_id"]
        employee_id=form.data["employee_id"]
    )
    db.session.add(newTable)
    db.session.commit()
    return newTable.to_dict()


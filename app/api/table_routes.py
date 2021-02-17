from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Table
from app.forms import NewTableForm
from app.models import db


table_routes = Blueprint("table", __name__)


# GET ALL TABLES
@table_routes.route("/<int:userId>")
def table_by_user(userId):
    tables = Table.query.filter_by(user_id=userId).all()
    return {table.id: table.to_dict() for table in tables}


@table_routes.route("/staff/<int:employeeId>")
def table_by_employee_id(employeeId):
    tables = Table.query.filter_by(employee_id=employeeId).all()
    return {table.id: table.to_dict() for table in tables}
# GET by employee id
# @table_routes.route("")


@table_routes.route("/create", methods=["POST"])
# @login_required
def new_table():
    form = NewTableForm()
    newTable = Table(
        table_number=form.data["table_number"],
        # customer_id=form.data["customer_id"],
        employee_id=form.data["employee_id"],
        user_id=form.data["user_id"]
    )
    db.session.add(newTable)
    db.session.commit()
    return newTable.to_dict()


@table_routes.route("/delete/<int:tableId>", methods=["DELETE"])
def delete(tableId):
    table = Table.query.filter(Table.id == tableId).first()
    db.session.delete(table)
    db.session.commit()
    return table.to_dict()

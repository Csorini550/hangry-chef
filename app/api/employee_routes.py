from flask import Blueprint, jsonify
from flask_login import login_required
from app.forms import NewEmployeeForm
from app.models import Employee
from app.models import db

employee_routes = Blueprint("employee", __name__)

# GET  EMPLOYEES BY USERID

# TODO look at docs for filter_by


@employee_routes.route("/<int:userId>")
# @login_required
def employee_by_user(userId):
    employees = Employee.query.filter_by(user_id=userId).all()
    return {employee.id: employee.to_dict() for employee in employees}


@employee_routes.route("/staff/<int:id>")
def employee_by_id(id):
    employee = Employee.query.get(id)
    return employee.to_dict()
# GET ALL EMPLOYEES


@employee_routes.route("")
def all_employees():
    employees = Employee.query.all()
    return {employee.id: employee.to_dict for employee in employees}


# CREATE AN EMPLOYEE
@employee_routes.route("/create", methods=["POST"])
# @login_required
def new_employee():
    form = NewEmployeeForm()
    newEmployee = Employee(
        user_id=form.data["user_id"],
        first_name=form.data["first_name"],
        last_name=form.data["last_name"],
        salary=form.data["salary"],
        table_number=form.data["table_number"],
        picture=form.data["picture"]
    )

    db.session.add(newEmployee)
    db.session.commit()
    return newEmployee.to_dict()

# help - first ever delete route, will it work??
# DELETE AN EMPLOYEE


@employee_routes.route("/delete/<int:employeeId>", methods=["DELETE"])
def delete(employeeId):
    # employeeId = request.get("employee_id")
    employee = Employee.query.filter(Employee.id == employeeId).first()
    db.session.delete(employee)
    db.session.commit()
    return employee.to_dict()

from flask import Blueprint, jsonify
from flask_login import login_required
from app.forms import NewCustomerForm
from app.models import Customer
from app.models import db


customer_routes = Blueprint("customer", __name__)


@customer_routes.route("")
def all_customer():
    customers = Customer.query.all()
    return {customer.id: customer.to_dict for customer in customers}


@customer_routes.route("/<int:table_number>")
def customer_by_number(table_number):
    customers = Customer.query.filter_by(table_number=table_number).all()
    return {customer.id: customer.to_dict() for customer in customers}


@customer_routes.route("/create", methods=["POST"])
def new_customer():
    form = NewCustomerForm()
    newCustomer = Customer(
        table_number=form.data["table_number"],
        tipp=form.data["tipp"],
        total_price=form.data["total_price"],
        server_review=form.data["server_review"],
        server_rating=form.data["server_rating"],
        order_issue=form.data["order_issue"],
        instagram=form.data["instagram"]
    )

    db.session.add(newCustomer)
    db.session.commit()
    return newCustomer.to_dict()

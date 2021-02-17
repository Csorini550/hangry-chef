from flask import Blueprint, jsonify
from flask_login import login_required
from app.forms import NewInventoryForm
from app.models import db, Inventory


inventory_routes = Blueprint("inventory", __name__)


# get inventory by userId
@inventory_routes.route("/<int:userId>")
# @login_required
def inventory_by_user(userId):
    inventories = Inventory.query.filter_by(user_id=userId).all()
    return {inventory.id: inventory.to_dict() for inventory in inventories}


@inventory_routes.route("/create", methods=["POST"])
# @login_required
def new_inventory():
    form = NewInventoryForm()
    newInventory = Inventory(
        ingredient_id=form.data["ingredient_id"],
        user_id=form.data["user_id"],
        food_item=form.data["food_item"],
        quantity=form.data["quantity"],
        market_price=form.data["market_price"]
    )
    db.session.add(newInventory)
    db.session.commit()
    return newInventory.to_dict()


@inventory_routes.route("/delete/<int:inventoryId>", methods=["DELETE"])
def delete(inventoryId):
    inventory = Inventory.query.filter(Inventory.id == inventoryId).first()
    db.session.delete(inventory)
    db.session.commit()
    return inventory.to_dict()

# from flask import Blueprint, jsonify
# from flask_login import login_required
# from app.forms import NewMenueFoodOrDrinksForm
# from app.models import Menue_food_or_drinks
# from app.models import db

# menue_food_or_drinks_routes = Blueprint("menue_food_or_drinks", __name__)


# @menue_food_or_drinks_routes.route("<int:foodOrDrinkId>")
# def menue_food_or_drink(foodOrDrinkId):
#     menue_food_or_drinks = Menue_food_or_drinks.query.filter_by(
#         food_or_drink_id=foodOrDrinkId).all()
#     return {menue_food_or_drink.id: menue_food_or_drink.to_dict() for menue_food_or_drink in menue_food_or_drinks}


# @menue_food_or_drinks_routes.route("/delete/<int:foodOrDrinkId>", methods=["DELETE"])
# def delete(foodOrDrinkId):
#     menue_food_or_drink = Menue_food_or_drinks.query.filter(
#         Menue_food_or_drink.food_or_drink_id == foodOrDrinkId).first()
#     db.session.delete(menue_food_or_drink)
#     db.session.commit()
#     return menue_food_or_drink.to_dict()

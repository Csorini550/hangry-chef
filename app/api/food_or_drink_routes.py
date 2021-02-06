from flask import Blueprint, jsonify
from flask_login import login_required
from app.forms import NewFoodOrDrinkForm
from app.models import Food_or_drink
from app.models import db

food_or_drink_routes = Blueprint("food_or_drink", __name__)
#GET FOOD_OR_DRINK BY MENUE_ID
@food_or_drink_routes.route("<int:menueId>")
def food_or_drink_by_menue(menueId):
    food_or_drinks = food_or_drink.query.filter_by(menue_id=menueId).all()
    return {food_or_drink.id: food_or_drink.to_dict() for food_or_drink in food_or_drinks}

#CREATE FOOD_OR_DRINK
@food_or_drink_routes.route("/create", methods=["POST"])
# @login_required
def new_food_or_drink():
    form = NewFoodOrDrinkForm()
    newFoodOrDrink = food_or_drink(
      menue_id=form.data["menue_id"],
      name=form.data["name"],
      price=form.data["price"],
      picture=form.data["picture"],
      description=form.data["description"]
    )

    db.session.add(newFoodOrDrink)
    db.session.commit()
    return newFoodOrDrink.to_dict()



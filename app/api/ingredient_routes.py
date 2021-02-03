from flask import Blueprint, jsonify
from flask_login import login_required
from app.forms import NewIngredientForm
from app.models import Ingredient
from app.models import db

#GET ingredient by food_or_drink_id
@ingredient_routes.route("<int:food_or_drinkId>")
@login_required
def ingredient_by_food_or_drink(food_or_drinkId):
    ingredient = ingredient.query.filter_by(food_or_drink_id=food_or_drinkId).all()
    return {ingredient.id: ingredient.to_dict() for ingredient in ingredients}


#GET INGREDIENT BY user_id
@ingredient_routes.route("<int:userId>")
@login_required
def ingredient_by_user(userId):
    ingredient = ingredient.query.filter_by(user_id=userId).all()
    return {ingredient.id: ingredient.to_dict() for ingredient in ingredients}


#POST INGREDINET
@ingredient_routes.routes("/create", methods=["POST"])
@login_required
def new_ingredient():
    form = NewIngredientForm()
    newIngredient = Ingredient(
        user_id=form.data["user_id"],
        food_or_drink_id=form.data["food_or_drink_id"],
        name = form.data["name"],
        price = form.data["price"],
        picture = form.data["picture"]
    )

    db.session.add(newIngredient)
    db.session.commit()
    return newIngredient.to_dict()


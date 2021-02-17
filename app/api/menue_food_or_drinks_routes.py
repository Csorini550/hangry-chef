from flask import Blueprint, jsonify
from flask_login import login_required
from app.forms import NewMenueFoodOrDrinksForm
from app.models import Menue_food_or_drinks
from app.models import db

menue_food_or_drinks_routes = Blueprint("menue_food_or_drinks", __name__)

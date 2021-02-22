from flask import Blueprint, jsonify
from flask_login import login_required
from app.forms import NewMenuListForm
from app.models import db, Menu_list
from flask import request


menu_list_routes = Blueprint("menu_list", __name__)


@menu_list_routes.route("/<int:userId>")
def menu_list_by_user(userId):
    menu_list = Menu_list.query.filter_by(user_id=userId).all()
    return {menu_list.id: menu_list.to_dict() for menu_list in menu_lists}


@menu_list_routes.route("/create", methods=["POST"])
def new_menu_list():
    form = NewMenuListForm()
    newMenuList = Menu_list(
        user_id=form.data["user_id"],
        menu_list=form.data["menu_list"],
        food_or_drink_list=form.data["food_or_drink_list"]
    )
    db.session.add(newMenuList)
    db.session.commit()
    return newInventory.to_dict()

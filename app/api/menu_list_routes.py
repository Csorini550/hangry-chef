from flask import Blueprint, jsonify
from flask_login import login_required
from app.forms import NewMenuListForm
from app.models import db, Menu_list
from flask import request


menu_list_routes = Blueprint("menu_list", __name__)


@menu_list_routes.route("/<int:userId>")
def menu_list_by_user(userId):
    menu_list = Menu_list.query.filter_by(
        user_id=userId).order_by(Menu_list.id.desc()).first()
    return menu_list.to_dict()


@ menu_list_routes.route("/create", methods=["POST"])
def new_menu_list():
    form = NewMenuListForm()
    print("menu!!!", form.data["menu_list"])
    newMenuList = Menu_list(
        user_id=form.data["user_id"],
        menu_list=form.data["menu_list"],
        food_or_drink_list=form.data["food_or_drink_list"]
    )
    db.session.add(newMenuList)
    db.session.commit()
    return newMenuList.to_dict()

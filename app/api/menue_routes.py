from flask import Blueprint, jsonify
from flask_login import login_required
from app.forms import NewMenueForm
from app.models import Menue
from app.models import db

menue_routes = Blueprint("menue", __name__)


# GET ALL MENUES
@menue_routes.route("")
def all_menues():
    menues = Menue.query.all()
    return {menue.id: menue.to_dict() for menue in menues}


# GET ONE MENUE BY ID
@menue_routes.route("/<int:userId>")
def menue(userId):
    menues = Menue.query.filter_by(user_id=userId).all()
    return {menue.id: menue.to_dict() for menue in menues}

# POST A MNEUE


@menue_routes.route("/create", methods=["POST"])
# @login_required
def new_menue():
    form = NewMenueForm()
    newMenue = Menue(
        user_id=form.data["user_id"],
        menue_name=form.data["menue_name"],
        food_item=form.data["food_item"],
        menue_array=form.data["menue_array"],
        qr_code=form.data["qr_code"],
        picture=form.data["picture"]
    )

    db.session.add(newMenue)
    db.session.commit()
    return newMenue.to_dict()


@menue_routes.route("/delete/<int:menuId>", methods=["DELETE"])
def delete(menuId):
    menu = Menue.query.filter(Menue.id == menuId).first()
    db.session.delete(menu)
    db.session.commit()
    return menu.to_dict()


@menue_routes.route("/edit/<int:menuId>", methods=["PATCH"])
def add_list(menuId):
    data = request.json
    menu = Menu.query.filter(Menu.id == menuId).first()
    menu.picture = data["picture"]
    db.session.commit()
    return menu.to_dict()

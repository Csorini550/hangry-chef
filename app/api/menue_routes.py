from flask import Blueprint, jsonify
from flask_login import login_required
from app.forms import NewMenueForm
from app.models import Menue
from app.models import db

menue_routes = Blueprint("menue", __name__)


#GET ALL MENUES
@menue_routes.route("")
def all_menues():
    menues = Menue.query.all()
    return {menue.id: menue.to_dict() for menue in menues}


#GET ONE MENUE BY ID
@menue_routes.route("/<int:userId>")
def menue(userId):
    menues = Menue.query.filter_by(user_id=userId).all()
    return { menue.id: menue.to_dict() for menue in menues}

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


    #GET MENUE BY USERID
    # @menue_routes.route("/<int:userId>")
    # # @login_required
    # def menue_by_user(userId):
    #     menues = Menue.query.filter_by(user_id=menueId).all()
    #     return {menue.id: menue.to_dict() for menue in menues}
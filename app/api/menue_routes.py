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
    return {menue.id: menue.to_dict for menue in menues}


#GET ONE MENUE BY ID
@menue_routes.routes("/<int:menueId")
def menue(menueId):
    menue = Menue.query.get(menueId)
    if menue:
        return {
            menue.id: menue.to_dict()
        }
    return <h1> Menue not found!</h1>

# POST A MNEUE
@menue_routes.routes("/create", methods=["POST"])
@login_required
def new_menue():
    form = NewMenueForm()
    newMenue = Menue(
        user_id=form.data["user_id"],
        menue_name=form.data["menue_name"],
        food_item=form.data["food_item"],
        menue_data=form.data["qr_code"],
        qr_code=form.data["qr_code"],
        picture=form.data["picture"]
    )

    db.session.add(newMenue)
    db.session.commit()
    return newMennue.to_dict()


    #GET MENUE BY USERID
    @menue_routes.route("/<int:userId")
    @login_required
    def menue_by_user(userId):
        menue = Menue.query.filter_by(user_id=menueId).all()
        return {menue.id: menue.to_dict() for menue in menues}
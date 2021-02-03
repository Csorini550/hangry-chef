from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Qr_code
from app.forms import NewQrCodeForm
from app.models import db


qr_code_routes = Blueprint("qr_code", __name__)


#GET QRCODE BY MENUE_ID
@qr_code_routes.routes("<int:menueId>")
def qr_code_by_menue(menueId):
    qr_code = Qr_code.query.filter_by(menue_id=menueId).all()
    return {qr_code.id: qr_code.to_dict() for qr_code in qr_codes}


@qr_code.routes("/create", method=["POST"])
@login_required
def new_qr_code():
    form = NewQrCodeForm()
    newQrCode = Qr_code(
      menue_id=form.data["menue_id"]
      qr_code=form.data["qr_code"]
    )

    db.session.add(newQrCode)
    db.session.commit()
    return newQrCode.to_dict()
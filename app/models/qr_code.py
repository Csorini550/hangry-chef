from .db import db
from sqlalchemy.orm import relationship, backref

class Qr_code(db.Model):
    __tablename__ = 'qr_codes'
    # __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key = True)
    menue_id = db.Column(db.Integer, db.ForeignKey('menues.id'))
    qr_code = db.Column(db.String, nullable=True)

    menue = db.relationship('Menue', backref='qr_codes')


    def to_dict(self):
        return {
            'id': self.id,
            'menue_id': self.menue_id,
            'qr_code': self.qr_code
        }
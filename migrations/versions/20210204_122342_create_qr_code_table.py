"""Create qr code table

Revision ID: 9c05215f541a
Revises: 6fbc9bdaa240
Create Date: 2021-02-04 12:23:42.367872

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9c05215f541a'
down_revision = '6fbc9bdaa240'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('qr_codes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('menue_id', sa.Integer(), nullable=True),
    sa.Column('qr_code', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['menue_id'], ['menues.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('qr_codes')
    # ### end Alembic commands ###

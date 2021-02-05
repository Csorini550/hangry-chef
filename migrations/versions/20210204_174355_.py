"""create food_or_drink table

Revision ID: a9409f931308
Revises: 0e5f2e3e8cf1
Create Date: 2021-02-04 17:43:55.156550

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a9409f931308'
down_revision = '0e5f2e3e8cf1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    food_or_drink_tables=op.create_table('food_or_drinks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('menue_id', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('picture', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['menue_id'], ['menues.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###

    op.bulk_insert(food_or_drink_tables,[
        {"menue_id":1, "name":"Cheeseburger", "price":12.00, "picture":None},
        {"menue_id":1, "name":"Beer", "price":4.00, "picture":None},
        {"menue_id":1, "name":"Salad", "price":9.00, "picture":None},
        {"menue_id":1, "name":"Coke", "price":2.00, "picture":None},
        ])


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('food_or_drinks')
    # ### end Alembic commands ###

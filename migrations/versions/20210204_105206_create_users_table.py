"""Create Users table

Revision ID: 313bb71cd800
Revises: 
Create Date: 2021-02-04 10:52:06.794559

"""
from alembic import op
import sqlalchemy as sa
from werkzeug.security import generate_password_hash


# revision identifiers, used by Alembic.
revision = '313bb71cd800'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    users_table = op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('restaurant_name', sa.String(), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    # ### end Alembic commands ###
    op.bulk_insert( users_table,
    [{"name":"Demo","restaurant_name":"Febos", "email": 'demo@aa.io', "hashed_password":generate_password_hash("password") }]
    )

# def seed_users():
#     #user
#     demo = User( 
#     email='demo@aa.io',
#     password='password',
#     name='demo',
#     restaurant_name="Demo restaurant"
#     )

def downgrade():
    pass
    # ### commands auto generated by Alembic - please adjust! ###
    # op.drop_table('users')
    # ### end Alembic commands ###

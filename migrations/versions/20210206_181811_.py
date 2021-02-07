"""empty message

Revision ID: 9b88842eae89
Revises: e193c2bce1b8
Create Date: 2021-02-06 18:18:11.915610

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9b88842eae89'
down_revision = 'e193c2bce1b8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('employees', 'picture')
    op.create_foreign_key(None, 'tables', 'users', ['user_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'tables', type_='foreignkey')
    op.add_column('employees', sa.Column('picture', sa.VARCHAR(), autoincrement=False, nullable=True))
    # ### end Alembic commands ###

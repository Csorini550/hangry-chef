"""Create table table

Revision ID: 0e5f2e3e8cf1
Revises: 4387a091c131
Create Date: 2021-02-04 12:54:54.266156

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0e5f2e3e8cf1'
down_revision = '4387a091c131'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    tables_table = op.create_table('tables',
                                   sa.Column('id', sa.Integer(),
                                             nullable=False),
                                   sa.Column('table_number',
                                             sa.Integer(), nullable=False),
                                   sa.Column('user_id', sa.Integer(),
                                             nullable=True),
                                   sa.Column('customer_id',
                                             sa.Integer(), nullable=True),
                                   sa.Column('employee_id',
                                             sa.Integer(), nullable=True),
                                   # sa.ForeignKeyConstraint(['customer_id'], ['customers.id'], ),
                                   sa.ForeignKeyConstraint(
                                       ['employee_id'], ['employees.id'], ),
                                   sa.ForeignKeyConstraint(
                                       ['user_id'], ['users.id'], ),
                                   sa.PrimaryKeyConstraint('id')
                                   )
    #### end Alembic commands ###
    op.bulk_insert(tables_table, [
        {"table_number": 1, "user_id": 1, "employee_id": 1},
        {"table_number": 2, "user_id": 1, "employee_id": 2},
        {"table_number": 3, "user_id": 1, "employee_id": 3},
    ])


#   tables1 = Table(
#         table_number = 1,
#         customer_id = 1,
#         employee_id =1
#     )

#     tables2 = Table(
#         table_number = 2,
#         customer_id = 2,
#         employee_id =2
#     )

#     tables3 = Table(
#         table_number = 3,
#         customer_id = 3,
#         employee_id =3
#     )
def downgrade():
    pass
    # ### commands auto generated by Alembic - please adjust! ###
    # op.drop_table('tables')
    # ### end Alembic commands ###

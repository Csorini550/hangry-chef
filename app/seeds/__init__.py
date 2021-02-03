from flask.cli import AppGroup
from .users import seed_users, undo_users
from .big_daddy_seeder import seed_all, undo_all


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_all()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_all()
    # Add other undo functions here

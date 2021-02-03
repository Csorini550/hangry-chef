from werkzeug.security import generate_password_hash
from app.models import db, Menue, Qr_code, Food_or_drink, Ingredient, Ingredient_food_or_drink, Employee, Table, Table_food_or_drink, Inventory, Review, Tip, Customer, Food_or_drink_customer

def seed_menues():
    menue1 = Menue(
        user_id = 1,
        menue_name = 'Example Menue',
        food_item = 'Pasta',
        menue_array = None,
        qr_code = None,
        picture = None
    )

    db.session.add(menue1)
    db.session.commit()

def undo_menues():
    db.session.execute('TRUNCATE menues restart identity cascade;')
    db.session.commit()


def seed_qr_codes():
    qr_code1 = Qr_code(
        menue_id = 1, 
        qr_code = None
    )

    db.session.add(qr_code1)
    db.session.commit()

def undo_qr_codes():
    db.session.execute('TRUNCATE qr_codes restart identity cascade;')
    db.session.commit()

def seed_food_or_drinks():
    food_or_drink1 = Food_or_drink(
        menue_id = 1,
        name = 'Cheeseburger',
        price = 9.00,
        picture = None
    )

    db.session.add(food_or_drink1)
    db.session.commit()

def undo_food_or_drinks():
    db.session.execute('TRUNCATE food_or_drinks restart identity cascade;')
    db.session.commit()


def seed_ingredients():
    ingredients1 = Ingredient(
        user_id = 1,
        food_or_drink_id =1,
        name = 'lettuce',
        price = 00.25,
        picture = None
    )
def seed_ingredients():
    ingredients2 = Ingredient(
        user_id = 1,
        food_or_drink_id =1,
        name = 'bun',
        price = 00.50,
        picture = None
    )
def seed_ingredients():
    ingredients3 = Ingredient(
        user_id = 1,
        food_or_drink_id =1,
        name = 'patty',
        price = 01.25,
        picture = None
    )
def seed_ingredients():
    ingredients4 = Ingredient(
        user_id = 1,
        food_or_drink_id =1,
        name = 'pickle',
        price = 00.15,
        picture = None
    )
def seed_ingredients():
    ingredients5 = Ingredient(
        user_id = 1,
        food_or_drink_id =1,
        name = 'tomato',
        price = 00.25,
        picture = None
    )

    db.session.add(ingredients1)
    db.session.add(ingredients2)
    db.session.add(ingredients3)
    db.session.add(ingredients4)
    db.session.add(ingredients5)
    db.session.commit()

def undo_ingredients():
    db.session.execute('TRUNCATE ingredients restart identity cascade;')
    db.session.commit()

def seed_ingredient_food_or_drink():
    ingredient_food_or_drinks1 = Ingredient_food_or_drink(
        food_or_drink_id = 1,
        ingredient_id = 1
    )

def seed_ingredient_food_or_drink():
    ingredient_food_or_drinks2 = Ingredient_food_or_drink(
        food_or_drink_id = 1,
        ingredient_id = 2
    )
def seed_ingredient_food_or_drink():
    ingredient_food_or_drinks3 = Ingredient_food_or_drink(
        food_or_drink_id = 1,
        ingredient_id = 3
    )
def seed_ingredient_food_or_drink():
    ingredient_food_or_drinks4 = Ingredient_food_or_drink(
        food_or_drink_id = 1,
        ingredient_id = 4
    )
def seed_ingredient_food_or_drink():
    ingredient_food_or_drinks5 = Ingredient_food_or_drink(
        food_or_drink_id = 1,
        ingredient_id = 5
    )
    db.session.add(ingredient_food_or_drinks1)
    db.session.add(ingredient_food_or_drinks2)
    db.session.add(ingredient_food_or_drinks3)
    db.session.add(ingredient_food_or_drinks4)
    db.session.add(ingredient_food_or_drinks5)
    db.session.commit()

def undo_ingredient_food_or_drink():
    db.session.execute('TRUNCATE ingredient_food_or_drinks restart identity cascade;')
    db.session.commit()

def seed_employee():
    employees1 = Employee(
        user_id = 1,
        first_name = "Karen",
        last_name = "Heffer",
        salary = 15.00
        table_number = 1,
        picture = None
    )
def seed_employee():
    employees2 = Employee(
        user_id = 1,
        first_name = "Steve",
        last_name = "Aioli",
        salary = 11.00
        table_number = 2,
        picture = None
    )
def seed_employee():
    employees3 = Employee(
        user_id = 1,
        first_name = "Harry",
        last_name = "Proper",
        salary = 8.00
        table_number = 3,
        picture = None
    )
    db.session.add(employees1)
    db.session.add(employees2)
    db.session.add(employees3)
    db.session.commit()

def undo_employee():
    db.session.execute('TRUNCATE employees restart identity cascade;')
    db.session.commit()

def seed_table():
    tables1 = Table(
        table_number = 1,
        customer_id = 1,
        employee_id =1,
    )
def seed_table():
    tables1 = Table(
        table_number = 2,
        customer_id = 2,
        employee_id =2,
    )
def seed_table():
    tables1 = Table(
        table_number = 3,
        customer_id = 3,
        employee_id =3,
    )
    db.session.add(tables1)
    db.session.add(tables2)
    db.session.add(tables3)
    db.session.commit()

def undo_table():
    db.session.execute('TRUNCATE tables restart identity cascade;')
    db.session.commit()

def seed_inventory():
    inventories1 = Inventory(
        ingredient_id = 1,
        food_item = 
        quantity = 
        market_price =
    )
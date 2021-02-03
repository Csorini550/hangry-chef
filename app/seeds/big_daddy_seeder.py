from werkzeug.security import generate_password_hash
from app.models import db, Menue, Qr_code, Food_or_drink, Ingredient, Ingredient_food_or_drink, Employee, Table, Table_food_or_drink, Inventory, Review, Tip, Customer, Food_or_drink_customer

def seed_all():
#menue
    menue1 = Menue(
        user_id = 1,
        menue_name = 'Example Menue',
        food_item = 'Pasta',
        menue_array = None,
        qr_code = None,
        picture = None
    )

    db.session.add(menue1)
    

#qr_code
    qr_code1 = Qr_code(
        menue_id = 1, 
        qr_code = None
    )

    db.session.add(qr_code1)
    


#food_or_drink
    food_or_drink1 = Food_or_drink(
        menue_id = 1,
        name = 'Cheeseburger',
        price = 12.00,
        picture = None
    )
    food_or_drink2 = Food_or_drink(
        menue_id = 1,
        name = "Beer",
        price = 4.00,
        picture = None
    )
    food_or_drink3 = Food_or_drink(
        menue_id = 1,
        name = "Salad",
        price = 9.00,
        picture = None
    )


    db.session.add(food_or_drink1)



    
#Ingredients
    ingredients1 = Ingredient(
        user_id = 1,
        food_or_drink_id =1,
        name = 'lettuce',
        price = 00.25,
        picture = None
    )

    ingredients2 = Ingredient(
        user_id = 1,
        food_or_drink_id =1,
        name = 'bun',
        price = 00.50,
        picture = None
    )

    ingredients3 = Ingredient(
        user_id = 1,
        food_or_drink_id =1,
        name = 'patty',
        price = 03.25,
        picture = None
    )

    ingredients4 = Ingredient(
        user_id = 1,
        food_or_drink_id =1,
        name = 'pickle',
        price = 00.75,
        picture = None
    )

    ingredients5 = Ingredient(
        user_id = 1,
        food_or_drink_id =1,
        name = 'tomato',
        price = 00.50,
        picture = None
    )

    ingredients6 = Ingredient(
        user_id = 1,
        food_or_drink_id =1,
        name = 'bacon',
        price = 01.75,
        picture = None
    )

    db.session.add(ingredients1)
    db.session.add(ingredients2)
    db.session.add(ingredients3)
    db.session.add(ingredients4)
    db.session.add(ingredients5)
    db.session.add(ingredients6)


#ingredient_food_or_drinks
    ingredient_food_or_drinks1 = Ingredient_food_or_drink(
        food_or_drink_id = 1,
        ingredient_id = 1
    )


    ingredient_food_or_drinks2 = Ingredient_food_or_drink(
        food_or_drink_id = 1,
        ingredient_id = 2
    )

    ingredient_food_or_drinks3 = Ingredient_food_or_drink(
        food_or_drink_id = 1,
        ingredient_id = 3
    )

    ingredient_food_or_drinks4 = Ingredient_food_or_drink(
        food_or_drink_id = 1,
        ingredient_id = 4
    )

    ingredient_food_or_drinks5 = Ingredient_food_or_drink(
        food_or_drink_id = 1,
        ingredient_id = 5
    )
    db.session.add(ingredient_food_or_drinks1)
    db.session.add(ingredient_food_or_drinks2)
    db.session.add(ingredient_food_or_drinks3)
    db.session.add(ingredient_food_or_drinks4)
    db.session.add(ingredient_food_or_drinks5)
    

#Employees
    employees1 = Employee(
        user_id = 1,
        first_name = "Karen",
        last_name = "Heffer",
        salary = 15.00
        table_number = 1,
        picture = None
    )

    employees2 = Employee(
        user_id = 1,
        first_name = "Steve",
        last_name = "Aioli",
        salary = 11.00
        table_number = 2,
        picture = None
    )

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


#Tables
    tables1 = Table(
        table_number = 1,
        customer_id = 1,
        employee_id =1,
    )

    tables1 = Table(
        table_number = 2,
        customer_id = 2,
        employee_id =2,
    )

    tables1 = Table(
        table_number = 3,
        customer_id = 3,
        employee_id =3,
    )
    db.session.add(tables1)
    db.session.add(tables2)
    db.session.add(tables3)


#Inventory
    inventories1 = Inventory(
        ingredient_id = 1,
        food_item = "lettuce",
        quantity = 250,
        market_price = 00.05
    )

    inventories2 = Inventory(
        ingredient_id = 2,
        food_item = "bun",
        quantity = 183,
        market_price = 00.80
    )

    inventories3 = Inventory(
        ingredient_id = 3,
        food_item = "patty",
        quantity = 181,
        market_price = 1.25
    )

    inventories4 = Inventory(
        ingredient_id = 4,
        food_item = 'pickle',
        quantity = 270,
        market_price = 00.35
    )

    inventories5 = Inventory(
        ingredient_id = 5,
        food_item = "tomato",
        quantity = 52,
        market_price = 00.30
    )

    inventories6 = Inventory(
        ingredient_id = 6,
        food_item = "bacon",
        quantity = 28,
        market_price = 00.99
    )

    db.session.add(inventories1)
    db.session.add(inventories2)
    db.session.add(inventories3)
    db.session.add(inventories4)
    db.session.add(inventories5)
    db.session.add(inventories6)


#REVIEWS
    reviews1 = Review(
        customer_id = 1,
        employee_id = 1,
        review = "She was very nice but spilled my husbands drink all over us. At least she got me a towel, and offered to clean it up.",
        rating = 3.5
    )

    reviews2 = Review(
        customer_id = 2,
        employee_id = 2,
        review = "Kind of looked like a famous dj I used to listen too, he even gave me extra bacon for free. What a man!",
        rating = 5
    )

    reviews3 = Review(
        customer_id = 3,
        employee_id = 3,
        review = "This guy was horrible, we asked about the special and he just started muttering about 'he who shall not be named'. It was annoying and very unprofessional",
        rating = 1
    )
    db.session.add(reviews1)
    db.session.add(reviews2)
    db.session.add(reviews3)

#tips
    tips1 = Tip(
        customer_id = 1,
        employee_id = 1,
        tip = 2.00
    )
    tips2 = Tip(
        customer_id = 2,
        employee_id = 2,
        tip = 8.00
    )
    tips3 = Tip(
        customer_id = 3,
        employee_id = 3,
        tip = 1.00
    )

    db.session.add(tips1)
    db.session.add(tips2)
    db.session.add(tips3)


def undo_all():
    db.session.execute('TRUNCATE ingredients restart identity cascade;')
    db.session.execute('TRUNCATE employees restart identity cascade;')
    db.session.execute('TRUNCATE tables restart identity cascade;')
    db.session.execute('TRUNCATE inventories restart identity cascade;')
    db.session.execute('TRUNCATE reviews restart identity cascade;')
    db.session.execute('TRUNCATE ingredient_food_or_drinks restart identity cascade;')
    db.session.execute('TRUNCATE qr_codes restart identity cascade;')
    db.session.execute('TRUNCATE food_or_drinks restart identity cascade;')
    db.session.execute('TRUNCATE menues restart identity cascade;')
    db.session.execute('TRUNCATE tips restart identity cascade;')
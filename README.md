# Hangry Cheff MVP
create menue
qr code
order-cart
reviews


# User stories
## owner -log in
        Bonus: Drag and drop feature to create a menu
    customize what a user can and can not customize
    ability to easily show they are out of a food items
    create a qr code that a user would use to see the menu, order, and checkout
    a spot where all the incoming orders show
    a spot where all the finished orders are
    owner can add servers 
        stretch:
            Drag and drop to create restaurant layout
            a table will light up green if they have an order they put in
            a table will light up red if user has an issue with the order

## Staff -log in
    stretch:
        can view tables
    


## user -no log in
    pick items from menu
    customize order i.e. no pineapple on my pineapple pizza
    pay for items
    the ability to leave a review for the server
    a link between the menu and instagram where a user can tag the restaurant and food item to instagram




## Data:
    owner can set inventory
    owner can see how many items are baught per day/week/month
    owner can see servers reviews
    owner can see how much a server does in sales
    owner can see servers total daily/weekly tips
    owner can see most popular items
    owner can see items that get the most instagram posts



# Routes:

## route / 
    owner log in
    staff log in
    
## /menue
    /create menue
    /edit menue
    /delete menue

## /staff
    /get staff
    /new staff
    /delete staff

## /staff/tips
      get /tips
## staff/reviews
      get reviews

## /inventory
    /get inventory 
    /post inventory
    /delete inventory

## /reviews
    /get reviews
    /post reviews

## /tables
    /post tables
    /get tables
    /delete tables

## /qr code
    /get menue from qr code

## Schema
   <img schema.jpg>

## Wire Fram
   <img wire-frame.jpeg>


## tech
    charkra
        https://chakra-ui.com/docs/hooks/use-clipboard
    reactdnd
        https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd/
    qrCode thingy
        npmjs.com/package/qrcode.react
    amazon webservices - maybe
    yikes!
    something that allows me to save my drag and drop menu as static html
    redux
    react
    flask 



## components - This will change
    menus
    create menu
    staff
    tables
    inventory
    user page 


















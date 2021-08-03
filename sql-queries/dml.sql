-- Data manipulation queries
-- The : character being used to denote variables from backend language

-- USERS

-- view all users
SELECT * FROM users;

-- view one user
SELECT * FROM users
WHERE userID = :userID;

-- insert a user
INSERT INTO users
(addressID, firstName, lastName, email, birthDate, storeCredits)
VALUES (:addressID, :firstName, :lastName, :email, :birthDate, :storeCredits);

-- update a user
UPDATE users
SET addressID = :addressID , firstName = :firstName , lastName = :lastName , email = :email , birthDate = :birthDate , storeCredits = :storeCredits
WHERE userID = :userID;


-- REVIEWS

-- view all reviews
SELECT * FROM reviews;

-- view reviews for a single product
SELECT * FROM reviews
WHERE productID = :productID;

-- insert a review
INSERT INTO reviews
(productID, userID, stars, reviewText, datePosted, lastUpdated)
VALUES (:productID, :userID, :stars, :reviewText, :datePosted, :lastUpdated);

-- update a review
UPDATE reviews
SET productID = :productID , userID = :userID , stars = :stars , reviewText = :reviewText , datePosted = :datePosted , lastUpdated = :lastUpdated
WHERE reviewID = :reviewID;

-- delete a review
DELETE FROM reviews
WHERE reviewID = :reviewID;


-- TAGS

-- view all tags
SELECT * FROM tags;

-- insert a tag
INSERT INTO tags
(tagName)
VALUES (:tagName);

-- update a tag
UPDATE tags
SET tagName = :tagName
WHERE tagID = :tagID;

-- delete a tag
DELETE FROM tags
WHERE tagID = :tagID;


-- PRODUCTS_TAGS

-- view all products_tags
SELECT * FROM products_tags;

-- view all tags for a single product
SELECT tags.tagName FROM products_tags
LEFT JOIN tags ON products_tags.tagID = tags.tagID
WHERE productID = :productID;

-- insert a tag to a product
INSERT INTO products_tags
(productID, tagID)
VALUES (:productID, :tagID);

-- update a products_tags
UPDATE products_tags
SET productID = :newProductID, tagID = :newTagID
WHERE productID = :productID AND tagID = :tagID;

-- delete a products_tags
DELETE FROM products_tags
WHERE productID = :productID AND tagID = :tagID;


-- USERS_PRODUCTS

-- view all users_products
SELECT * FROM users_products;

-- view all products in a users carts
SELECT * FROM users_products
WHERE userID = :userID;

-- insert an item to a users cart
INSERT INTO users_products
(userID, productID, quantity)
VALUES (:userID, :productID, :quantity);

-- update quantity of item in user cart
UPDATE users_products
SET userID = :userID, productID = :productID, quantity = :quantity
WHERE userID = :userID AND productID = :productID;

-- delete an item from user cart
DELETE FROM users_products
WHERE userID = :userID AND productID = :productID;


--Products
--Read 1
SELECT * FROM products
WHERE productID = :productID;

--Read All
SELECT * from products;

-- insert a product
INSERT INTO products
(userID, name, description, price, datePosted, lastUpdated, imageURL)
VALUES (:userID, :name, :description, :price, :datePosted, :lastUpdated, :imageURL);

--Update
UPDATE products
SET description = :description , name = :name , imageURL = :imageURL , price = :price , passwordHash = :passwordHash , datePosted = :datePosted , lastUpdated = :lastUpdated
WHERE productID = :productID;


--Orders

--Read one order

SELECT * FROM orders
WHERE orderID = :orderID;

--Read all orders

SELECT * FROM orders;

--Read all orders from a user

SELECT * FROM orders
WHERE userID = :userID;

-- insert an order
INSERT INTO orders
(userID, addressID, orderDate, firstName, lastName, email)
VALUES (:userID, :addressID, :orderDate, :firstName, :lastName, :email);

--Products_Orders

--Read all products from an order
SELECT * FROM products_orders
WHERE orderID = :orderID;

--Read All products_orders
SELECT * FROM products_orders

-- Read all products purchased by user
SELECT * FROM products
JOIN products_orders ON products.productID = products_orders.productID
JOIN orders ON orders.orderID = products_orders.orderID
WHERE order.userID = :userID;

-- insert a products_orders
INSERT INTO products_orders
(orderID, productID, quantity)
VALUES (:orderID, :productID, :quantity);

--Addresses

-- Read One

SELECT * FROM addresses
WHERE addressID = :addressID;

--Read All
SELECT * FROM addresses

-- insert an address
INSERT INTO addresses
(streetAddress, city, zip, state, country)
VALUES (:streetAddress, :city, :zip, :state, :country);

--Update
UPDATE addresses
SET streetAddress = :streetAddress , city = :city , zip = :zip , state = :state , country = :country
WHERE addressID = :addressID;

--Delete

DELETE FROM addresses
WHERE addressID = :addressID;

-- Data definition queries

-- USERS
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    userID INT AUTO_INCREMENT NOT NULL,
    addressID INT,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    passwordHash VARCHAR(50) NOT NULL,
    birthDate DATE NOT NULL,
    storeCredits DECIMAL(13, 2) NOT NULL,
    PRIMARY KEY (userID),
    FOREIGN KEY (addressID) 
        REFERENCES addresses(addressID)
        ON DELETE SET NULL
);

INSERT INTO users
    (addressID, firstName, lastName, email, passwordHash, birthDate, storeCredits)
VALUES
    (0, "Alice", "Baker", "abaker@example.com", "$2y$12$EQ6ak4F1T9s4YwerPQZsMuZIs/j5t9c6wkOyDy8BdsgdhoHyCdTfq ", "1995-01-12", 100),
    (1, "Bob", "Smith", "bsmith@exmple.com", "$2y$12$EQ6ak4F1T9s4YwerPQZsMuZIs/j5t9c6wkOyDy8BdsgdhoHyCdTfq ", "1990-07-25", 70),
    (NULL, "Carol", "Henderson", "chenderson@example.com", "$2y$12$EQ6ak4F1T9s4YwerPQZsMuZIs/j5t9c6wkOyDy8BdsgdhoHyCdTfq ", "1997-03-15", 0),
    (NULL, "David", "Kim", "dkim@example.com", "$2y$12$EQ6ak4F1T9s4YwerPQZsMuZIs/j5t9c6wkOyDy8BdsgdhoHyCdTfq ", "1987-12-07", 40),
    (2, "Eve", "Walker", "ewalker@example.com", "$2y$12$EQ6ak4F1T9s4YwerPQZsMuZIs/j5t9c6wkOyDy8BdsgdhoHyCdTfq ", "2001-04-20", 2000);


-- REVIEWS
DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
    reviewID INT AUTO_INCREMENT NOT NULL,
    productID INT NOT NULL,
    userID INT NOT NULL,
    stars INT NOT NULL,
    reviewText text,
    datePosted DATE NOT NULL,
    lastUpdated DATE NOT NULL
    FOREIGN KEY (productID)
        REFERENCES products(productID)
        ON DELETE CASCADE,
    FOREIGN KEY (userID) 
        REFERENCES users(userID)
        ON DELETE CASCADE
);

INSERT INTO reviews
    (productID, userID, stars, reviewText, datePosted, lastUpdated)
VALUES
    (0, 0, 4, "Great product!", "2021-07-15", "2021-07-15"),
    (0, 3, 3, NULL, "2021-07-17", "2021-07-17"),
    (1, 1, 4, NULL, "2021-07-15", "2021-07-15"),
    (2, 4, 5, "I really like this template!", "2021-07-20", "2021-07-20"),
    (3, 2, 4, NULL, "2021-07-21", "2021-07-21");


-- TAGS
DROP TABLE IF EXISTS tags;

CREATE TABLE tags (
    tagID INT AUTO_INCREMENT NOT NULL,
    tagName VARCHAR(20) NOT NULL,
    PRIMARY KEY (tagID)
);

INSERT INTO tags
    (tagName)
VALUES
    ("HTML"),
    ("CSS"),
    ("Wordpress"),
    ("React"),
    ("Angular"),
    ("Vue"),
    ("JQuery");


-- PRODUCTS_TAGS
DROP TABLE IF EXISTS products_tags;

CREATE TABLE products_tags (
    productID INT NOT NULL,
    tagID INT NOT NULL,
    FOREIGN KEY (productID)
        REFERENCES products(productID)
        ON DELETE CASCADE,
    FOREIGN KEY (tagID) 
        REFERENCES tags(tagID)
        ON DELETE CASCADE
);

INSERT INTO products_tags
    (productID, tagID)
VALUES
    (0, 3),
    (0, 1),
    (1, 2),
    (2, 1),
    (2, 6),
    (3, 4),
    (4, 5),
    (4, 1);


-- USERS_PRODUCTS
DROP TABLE IF EXISTS users_products;

CREATE TABLE users_products (
    userID INT NOT NULL,
    productID INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (userID) 
        REFERENCES users(userID)
        ON DELETE 
);

INSERT INTO users_products
    (userID, productID, quantity)
VALUES
    (0, 1, 1),
    (0, 2, 1),
    (4, 1, 1);


--Products
DROP TABLE IF EXISTS products;

CREATE TABLE products (
    productID int AUTO_INCREMENT NOT NULL unique,
    userID int not NULL,
    description varchar(255),
    name varchar(255) not NULL,
    imageURL varchar(255),
    price decimal(13, 2) not NULL,
    datePosted date not NULL,
    lastUpdated date not NULL,
    PRIMARY KEY (productID),
    FOREIGN KEY (userID) 
        REFERENCES users(userID)
        ON DELETE 
);

    
INSERT INTO products
    (userID, description, name, imageURL, price, datePosted, lastUpdated)
VALUES
    (0, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pharetra dui leo, id imperdiet eros scelerisque tempor. Etiam vitae magna vitae nulla sagittis fringilla a sed libero. Nunc nisi nulla, egestas ut fermentum placerat, volutpat ac justo. Suspendisse luctus imperdiet purus non tempor.", "Cryptocurrency Web App React JS Template", "/images/sample/template-1.jpg", 60, "2021-07-15","2021-07-15"),
    (1, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pharetra dui leo, id imperdiet eros scelerisque tempor. Etiam vitae magna vitae nulla sagittis fringilla a sed libero. Nunc nisi nulla, egestas ut fermentum placerat, volutpat ac justo. Suspendisse luctus imperdiet purus non tempor.", "Custom Interactive Map jQuery Plugin", "/images/sample/template-2.jpg", 30, "2021-12-15","2021-12-15"),
    (0, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pharetra dui leo, id imperdiet eros scelerisque tempor. Etiam vitae magna vitae nulla sagittis fringilla a sed libero. Nunc nisi nulla, egestas ut fermentum placerat, volutpat ac justo. Suspendisse luctus imperdiet purus non tempor.", "React Personal Portfolio Template + React Hooks", "/images/sample/template-3.jpg", 50, "2021-09-15","2021-09-15"),
    (2, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pharetra dui leo, id imperdiet eros scelerisque tempor. Etiam vitae magna vitae nulla sagittis fringilla a sed libero. Nunc nisi nulla, egestas ut fermentum placerat, volutpat ac justo. Suspendisse luctus imperdiet purus non tempor.", "Multipurpose eCommerce WordPress Theme", "/images/sample/template-4.jpg", 22, "2020-09-15","2021-09-15"),
    (1, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pharetra dui leo, id imperdiet eros scelerisque tempor. Etiam vitae magna vitae nulla sagittis fringilla a sed libero. Nunc nisi nulla, egestas ut fermentum placerat, volutpat ac justo. Suspendisse luctus imperdiet purus non tempor.", "Marketing HTML Landing Page", "/images/default_image.jpg", 22, "2020-09-15","2021-09-15");


--Orders
DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
    orderID int auto_increment unique not NULL,
    userID int not NULL,
    billingAddressID int not NULL,
    orderDate Date not NULL,
    firstName varchar(255) not NULL,
    lastName varchar(255) not NULL,
    email varchar(255) unique not NULL,
    PRIMARY KEY (orderID),
    FOREIGN KEY (userID) 
        REFERENCES users(userID)
        ON DELETE,
    FOREIGN KEY (billingAddressID) 
        REFERENCES addresses(addressID)
        ON DELETE
);

INSERT INTO orders
    (userID, billingAddressID, orderDate, firstName, lastName, email)
VALUES
    (1, 1, "2020-09-15", "Jonah", "Biedermann", "jonah0502@gmail.com"),
    (2, 1,"2020-10-15", "Abbey", "Ramsey", "aream123@gmail.com" ),
    (1, 1,"2020-09-17", "John", "Ackerman" , "ackerj@gmail.com");

--products_orders

DROP TABLE IF EXISTS products_orders;

CREATE TABLE users_products (
    orderID int, not NULL,
    productID int, not NULL,
    quantity int NOT NULL
);

INSERT INTO users_products
    (orderID, productID, quantity)
VALUES
    (0, 1, 1),
    (1, 2, 1),
    (2, 1, 1);

--Addresses
DROP TABLE IF EXISTS addresses;

CREATE TABLE addresses (
    addressID int auto_increment unique not NULL,
    streetAddress varchar(50) not NULL,
    city varchar(50) not NULL,
    zip varchar(11) not NULL,
    state char(2) not NULL,
    country char(2) not NULL,
    PRIMARY KEY (addressID);
);

INSERT INTO addresses
    (streetAddress, city, zip, state, country)
VALUES
    ("181 Cambridge Street Lake Villa", "San Jose","95127","CA", "US"),
    ("7161 Del Monte Ave. San Jose", "Romulus", "48174","MI", "US"),
    ("7391 School St. Romulus", "Lake Villa", "60046","IL", "US");


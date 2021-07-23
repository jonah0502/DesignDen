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
    storeCredits DECIMAL(13, 2) NOT NULL,
    birthDate DATE NOT NULL,
    PRIMARY KEY (userID),
    FOREIGN KEY (addressID) 
        REFERENCES addresses(addressID)
        ON DELETE SET NULL
);

INSERT INTO users
VALUES 
    (DEFAULT, 0, "Alice", "Baker", "abaker@example.com", "1995-01-12", 100),
    (DEFAULT, 1, "Bob", "Smith", "bsmith@exmple.com", "1990-07-25", 70),
    (DEFAULT, NULL, "Carol", "Henderson", "chenderson@example.com", "1997-03-15", 0),
    (DEFAULT, NULL, "David", "Kim", "dkim@example.com", "1987-12-07", 40),
    (DEFAULT, 2, "Eve", "Walker", "ewalker@example.com", "2001-04-20", 2000);

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
VALUES
    (DEFAULT, 0, 0, 4, "Great product!", "2021-07-15", "2021-07-15"),
    (DEFAULT, 0, 3, 3, NULL, "2021-07-17", "2021-07-17"),
    (DEFAULT, 1, 1, 4, NULL, "2021-07-15", "2021-07-15"),
    (DEFAULT, 2, 4, 5, "I really like this template!", "2021-07-20", "2021-07-20"),
    (DEFAULT, 3, 2, 4, NULL, "2021-07-21", "2021-07-21");

-- TAGS
DROP TABLE IF EXISTS tags;

CREATE TABLE tags (
    tagID INT AUTO_INCREMENT NOT NULL,
    tagName VARCHAR(20) NOT NULL,
    PRIMARY KEY (tagID)
);

INSERT INTO tags
VALUES
    (DEFAULT, "HTML"),
    (DEFAULT, "CSS"),
    (DEFAULT, "Wordpress"),
    (DEFAULT, "React"),
    (DEFAULT, "Angular"),
    (DEFAULT, "Vue"),
    (DEFAULT, "JQuery");

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
VALUES
    (DEFAULT, 0, 3),
    (DEFAULT, 0, 1),
    (DEFAULT, 1, 2),
    (DEFAULT, 2, 1),
    (DEFAULT, 2, 6),
    (DEFAULT, 3, 4),
    (DEFAULT, 4, 5),
    (DEFAULT, 4, 1);

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
VALUES
    (0, 1, 1),
    (0, 2, 1),
    (4, 1, 1);


--Products
DROP TABLE IF EXISTS products;

CREATE TABLE products (
    productID: int AUTO_INCREMENT NOT NULL unique,
    userID: int not NULL,
    description: varchar(255),
    name: varchar(255) not NULL,
    imageURL: varchar(255),
    price: decimal(13, 2) not NULL,
    datePosted: date not NULL,
    lastUpdated: date not NULL,
    PRIMARY KEY (productID),
    FOREIGN KEY (userID) 
        REFERENCES users(userID)
        ON DELETE 
);

INSERT INTO products
VALUES
    (DEFAULT, 0, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pharetra dui leo, id imperdiet eros scelerisque tempor. Etiam vitae magna vitae nulla sagittis fringilla a sed libero. Nunc nisi nulla, egestas ut fermentum placerat, volutpat ac justo. Suspendisse luctus imperdiet purus non tempor.", "Cryptocurrency Web App React JS Template", "/images/sample/template-1.jpg", 60, "2021-07-15","2021-07-15"),
    (DEFAULT, 1, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pharetra dui leo, id imperdiet eros scelerisque tempor. Etiam vitae magna vitae nulla sagittis fringilla a sed libero. Nunc nisi nulla, egestas ut fermentum placerat, volutpat ac justo. Suspendisse luctus imperdiet purus non tempor.", "Custom Interactive Map jQuery Plugin", "/images/sample/template-2.jpg", 30, "2021-12-15","2021-12-15"),
    (DEFAULT, 0, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pharetra dui leo, id imperdiet eros scelerisque tempor. Etiam vitae magna vitae nulla sagittis fringilla a sed libero. Nunc nisi nulla, egestas ut fermentum placerat, volutpat ac justo. Suspendisse luctus imperdiet purus non tempor.", "React Personal Portfolio Template + React Hooks", "/images/sample/template-3.jpg", 50, "2021-09-15","2021-09-15"),
    (DEFAULT, 2, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pharetra dui leo, id imperdiet eros scelerisque tempor. Etiam vitae magna vitae nulla sagittis fringilla a sed libero. Nunc nisi nulla, egestas ut fermentum placerat, volutpat ac justo. Suspendisse luctus imperdiet purus non tempor.", "Multipurpose eCommerce WordPress Theme", "/images/sample/template-4.jpg", 22, "2020-09-15","2021-09-15"),
    (DEFAULT, 1, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pharetra dui leo, id imperdiet eros scelerisque tempor. Etiam vitae magna vitae nulla sagittis fringilla a sed libero. Nunc nisi nulla, egestas ut fermentum placerat, volutpat ac justo. Suspendisse luctus imperdiet purus non tempor.", "Marketing HTML Landing Page", "/images/default_image.jpg", 22, "2020-09-15","2021-09-15");

--Orders
DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
    orderID: int auto_increment unique not NULL,
    userID: int not NULL,
    billingAddressID: int not NULL,
    orderDate: Date not NULL,
    firstName: varchar(255) not NULL,
    lastName: varchar(255) not NULL,
    email: varchar(255) unique not NULL,
    PRIMARY KEY (orderID),
    FOREIGN KEY (userID) 
        REFERENCES users(userID)
        ON DELETE,
    FOREIGN KEY (billingAddressID) 
        REFERENCES addresses(addressID)
        ON DELETE
);

INSERT INTO orders
VALUES
    (DEFAULT, 1, 1, "2020-09-15", "Jonah", "Biedermann", "jonah0502@gmail.com"),
    (DEFAULT, 2, 1,"2020-10-15", "Abbey", "Ramsey", "aream123@gmail.com" ),
    (DEFAULT, 1, 1,"2020-09-17", "John", "Ackerman" , "ackerj@gmail.com");

--products_orders

DROP TABLE IF EXISTS products_orders;

CREATE TABLE users_products (
    orderID: int, not NULL,
    productID:int, not NULL,
    quantity INT NOT NULL
);


INSERT INTO users_products
VALUES
    (0, 1, 1),
    (1, 2, 1),
    (2, 1, 1);

--Addresses
DROP TABLE IF EXISTS addresses;

CREATE TABLE addresses (
    addressID: int auto_increment unique not NULL,
    streetAddress: varchar(50) not NULL,
    city: varchar(50) not NULL,
    zip: varchar(11) not NULL,
    state: char(2) not NULL,
    country: char(2) not NULL,
    PRIMARY KEY (addressID);
);

INSERT INTO addresses
VALUES
    (DEFAULT, "181 Cambridge Street Lake Villa", "San Jose","95127","CA", "US"),
    (DEFAULT, "7161 Del Monte Ave. San Jose", "Romulus", "48174","MI", "US"),
    (DEFAULT, "7391 School St. Romulus", "Lake Villa", "60046","IL", "US");
-- Data manipulation queries

--Products

--Create
INSERT INTO products
    (userID, description, name, imageURL, price, datePosted, lastUpdated)
VALUES
    (0, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pharetra dui leo, id imperdiet eros scelerisque tempor. Etiam vitae magna vitae nulla sagittis fringilla a sed libero. Nunc nisi nulla, egestas ut fermentum placerat, volutpat ac justo. Suspendisse luctus imperdiet purus non tempor.", "Cryptocurrency Web App React JS Template", "/images/sample/template-1.jpg", 60, "2021-07-15","2021-07-15"),

--Read 1

SELECT * from products where productID = 1;

--Read All
SELECT * from products;

--Update


--Delete
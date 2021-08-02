import Layout from "@/components/Layout";
import styles from "@/styles/Table.module.css";
import productsService from "../../services/products.js";
import { useEffect, useState } from "react";
import Message from "@/components/Message.js";

const productHeaders = [
  "ProductID",
  "UserID",
  "Name",
  "Description",
  "Price",
  "DatePosted",
  "LastUpdated",
  "ImageURL",
  "Update",
];



export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [productsForm, setProductsForm] = useState({});
  const [message, setMessage] = useState({ text: null, isError: false });


  // get all reviews from database on first page load
  useEffect(() => {
    productsService
      .getAll()
      .then((response) => {
        setProducts(response);
      })
      .catch((e) => console.log(e));
  }, []);

// outputs a success or error message to the screen
const displayMessage = (text, isError) => {
  setMessage({ text: text, isError: isError });
  setTimeout(() => {
    setMessage({ text: null, isError: false });
  }, 5000);
};

  // add new review to database from button click
  const addProduct = (event) => {
    event.preventDefault();
    const today = new Date().toISOString().slice(0, 10);

    let newProduct = { ...productsForm, datePosted: today, lastUpdated: today };
    
    productsService
      .create(newProduct)
      .then((response) => {
        newProduct = { ...newProduct, productID: response.id };
        setProducts(products.concat(newProduct));
        setProductsForm({});
        displayMessage(response.message, false);
      })
      .catch((error) => {
        let errMsg;
        if (error.response) {
          errMsg = error.response.data;
        } else {
          errMsg = "Error: Unable to add address, missing required fields.";
        }
        displayMessage(errMsg, true);
      });
  };


  const handleRowChange = (index) => (event) => {
    const { name, value } = event.target;
    const newProducts = [...products];
    newProducts[index][name] = value;
    setProducts(newProducts);
  };

    // update review from row button click
    const updateProduct = (index) => (event) => {
      event.preventDefault();
      const today = new Date().toISOString().slice(0, 10);
      const newProduct = { ...products[index], lastUpdated: today };
      productsService
        .update(newProduct.productID, newProduct)
        .then((response) => {
          setProducts(
            products.map((product) =>
            product.productID !== newProduct.productID ? product : newProduct
            )
          );
          displayMessage(response, false);
        })
        .catch((error) => {
          displayMessage(error.response.data, true);
        });
    };

  return (
    <Layout>
      <Message message={message.text} isError={message.isError} />
      <h1>Products</h1>
      <p>Supported operations: Create, Read, Update</p>
      <br />
      {/*<input
        type="text"
        value={filter}
        placeholder="Search by Name"
        onChange={handleSearch}
      />*/}
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              {productHeaders.map((header) => {
                return <th key={header}>{header}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
                <tr key={product.productID}>
                  <td>{product.productID}</td>
                  <td>{product.userID} </td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={product.name}
                      onChange={handleRowChange(index)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="description"
                      value={product.description}
                      onChange={handleRowChange(index)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="price"
                      value={product.price}
                      onChange={handleRowChange(index)}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      name="datePosted"
                      value={product.datePosted}
                      onChange={handleRowChange(index)}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      name="lastUpdated"
                      value={product.lastUpdated}
                      onChange={handleRowChange(index)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="imageURL"
                      value={product.imageURL}
                      onChange={handleRowChange(index)}
                    />
                  </td>
                  <td>
                    <button onClick={updateProduct(index)}>Update</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <br />
      <h3>Add new product</h3>
      <form className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <input type="text" 
          placeholder="UserID" 
          value={productsForm.userID || ""}
          onChange={(e) =>
            setProductsForm({ ...productsForm, userID: e.target.value })
          }/>
          <input type="text" 
          placeholder="Name"
          value={productsForm.name || ""}
          onChange={(e) =>
            setProductsForm({ ...productsForm, name: e.target.value })
          } />
          <textarea 
          placeholder="Description" 
          rows="3" 
          cols="50"
          value={productsForm.description || ""}
          onChange={(e) =>
            setProductsForm({ ...productsForm, description: e.target.value })
          } />
          <input 
          type="number" 
          min="0" 
          placeholder="Price" 
          value={productsForm.price || ""}
          onChange={(e) =>
            setProductsForm({ ...productsForm, price: e.target.value })
          }
          />
          <input 
          type="text" 
          placeholder="Image URL"
          value={productsForm.imageURL || ""}
          onChange={(e) =>
            setProductsForm({ ...productsForm, imageURL: e.target.value })
          }
          />
        </div>
        <div>
          <button onClick={addProduct}>Add</button>
        </div>
      </form>
    </Layout>
  );
}

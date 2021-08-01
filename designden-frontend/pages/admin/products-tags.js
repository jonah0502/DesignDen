import Layout from "@/components/Layout";
import Message from "@/components/Message";
import styles from "@/styles/Table.module.css";
import productService from "../../services/products";
import { useEffect, useState } from "react";

const headers = ["ProductID", "TagID", "Delete"];

export default function ProductTagsPage() {
  // initalize state variables
  const [prodTags, setProdTags] = useState([]);
  const [prodInput, setProdInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [message, setMessage] = useState({ text: null, isError: false });

  // get all product tags on first page load
  useEffect(() => {
    productService
      .getAllProductTags()
      .then((response) => {
        setProdTags(response);
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

  // add a new product tag on button click
  const addProductTag = (event) => {
    event.preventDefault();
    productService
      .createProductTag(prodInput, tagInput)
      .then((response) => {
        setProdTags(prodTags.concat({ productID: prodInput, tagID: tagInput }));
        displayMessage(response, false);
      })
      .catch((error) => {
        let errMsg;
        if (error.response) {
          errMsg = error.response.data;
        } else {
          errMsg =
            "Error: Unable to add tag to product, missing required fields.";
        }
        displayMessage(errMsg, true);
      });
  };

  // delete a product tag on button click
  const deleteProductTag = (index) => (event) => {
    event.preventDefault();
    productService
      .removeProductTag(prodTags[index].productID, prodTags[index].tagID)
      .then((response) => {
        const newProdTags = [...prodTags];
        newProdTags.splice(index, 1);
        setProdTags(newProdTags);
        displayMessage(response, false);
      })
      .catch((error) => {
        displayMessage(error.response.data, true);
      });
  };

  // keep track of productID input state
  const handleProdChange = (event) => {
    setProdInput(event.target.value);
  };

  // keep track of tagID input state
  const handleTagChange = (event) => {
    setTagInput(event.target.value);
  };

  return (
    <Layout>
      <Message message={message.text} isError={message.isError} />
      <h1>Products_Tags</h1>
      <p>Represents the tags associated with each product</p>
      <p>Supported operations: Create, Read, Delete</p>
      <br />
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              {headers.map((header) => {
                return <th key={header}>{header}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {prodTags.map((p, index) => (
              <tr key={`${p.productID}-${p.tagID}`}>
                <td>{p.productID}</td>
                <td>{p.tagID}</td>
                <td>
                  <button onClick={deleteProductTag(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <form className={styles.formContainer}>
        <h3>Add a tag to a product</h3>
        <input
          type="text"
          placeholder="ProductID*"
          value={prodInput}
          onChange={handleProdChange}
        />
        <input
          type="text"
          placeholder="TagID*"
          value={tagInput}
          onChange={handleTagChange}
        />
        <button onClick={addProductTag}>Add</button>
      </form>
    </Layout>
  );
}

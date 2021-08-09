import Layout from "@/components/Layout";
import Message from "@/components/Message";
import styles from "@/styles/Table.module.css";
import productService from "../../services/products";
import tagService from "../../services/tags";
import { getProductList } from "../../services/products";
import { useEffect, useState } from "react";

const headers = ["ProductID", "Product", "TagID", "Tag", "Delete"];

export default function ProductTagsPage() {
  // initalize state variables
  const [prodTags, setProdTags] = useState([]);
  const [prodInput, setProdInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [message, setMessage] = useState({ text: null, isError: false });
  const [productList, setProductList] = useState([]);
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    // get all product tags on first page load
    productService
      .getAllProductTags()
      .then((response) => {
        setProdTags(response);
      })
      .catch((e) => console.log(e));
    // get list of products for the form
    getProductList()
      .then((response) => {
        setProductList(response);
      })
      .catch((e) => console.log(e));
    // get list of tags for the form
    tagService
      .getAll()
      .then((response) => {
        setTagList(response);
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
    const productID =
      productList.map((product) => product.name).indexOf(prodInput) + 1;
    const tagID = tagList.map((tag) => tag.tagName).indexOf(tagInput) + 1;
    productService
      .createProductTag(productID, tagID)
      .then((response) => {
        const newProductTag = {
          productID: productID,
          productName: prodInput,
          tagID: tagID,
          tagName: tagInput,
        };
        setProdTags(prodTags.concat(newProductTag));
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
                <td>{p.productName}</td>
                <td>{p.tagID}</td>
                <td>{p.tagName}</td>
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
        <select
          value={prodInput}
          onChange={(e) => setProdInput(e.target.value)}
        >
          <option value="">Select product</option>
          {productList.map((product) => (
            <option key={product.productID} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>
        <select value={tagInput} onChange={(e) => setTagInput(e.target.value)}>
          <option value="">Select tag</option>
          {tagList.map((tag) => (
            <option key={tag.tagID} value={tag.tagName}>
              {tag.tagName}
            </option>
          ))}
        </select>
        <button onClick={addProductTag}>Add</button>
      </form>
    </Layout>
  );
}

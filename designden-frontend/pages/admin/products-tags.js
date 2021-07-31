import Layout from "@/components/Layout";
import styles from "@/styles/Table.module.css";
import productService from "../../services/products";
import { useEffect, useState } from "react";

const headers = ["ProductID", "TagID", "Delete"];

export default function ProductTagsPage() {
  const [prodTags, setProdTags] = useState([]);
  const [prodInput, setProdInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    productService
      .getAllProductTags()
      .then((response) => {
        setProdTags(response);
      })
      .catch((e) => console.log(e));
  });

  const addProductTag = (event) => {
    event.preventDefault();
    productService
      .createProductTag(prodInput, tagInput)
      .then((response) => {
        console.log(response);
        setProdTags(prodTags.concat({ productID: prodInput, tagID: tagInput }));
      })
      .catch((e) => console.log(e));
  };

  const deleteProductTag = (index) => (event) => {
    event.preventDefault();
    productService
      .removeProductTag(prodTags[index].productID, prodTags[index].tagID)
      .then((response) => {
        console.log(response);
        const newProdTags = [...prodTags];
        newProdTags.splice(index, 1);
        setProdTags(newProdTags);
      })
      .catch((e) => console.log(e));
  };

  const handleRowChange = (index) => (event) => {
    const { name, value } = event.target;
    const newProdTags = [...prodTags];
    newProdTags[index][name] = value;
    setProdTags(newProdTags);
  };

  const handleProdChange = (event) => {
    setProdInput(event.target.value);
  };

  const handleTagChange = (event) => {
    setTagInput(event.target.value);
  };

  return (
    <Layout>
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
          placeholder="ProductID"
          value={prodInput}
          onChange={handleProdChange}
        />
        <input
          type="text"
          placeholder="TagID"
          value={tagInput}
          onChange={handleTagChange}
        />
        <button onClick={addProductTag}>Add</button>
      </form>
    </Layout>
  );
}

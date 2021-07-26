import Layout from "@/components/Layout";
import styles from "@/styles/Table.module.css";
import { useState } from "react";

const headers = ["ProductID", "TagID", "Update", "Delete"];

const data = [
  {
    productID: 0,
    tagID: 0,
  },
  {
    productID: 0,
    tagID: 1,
  },
  {
    productID: 0,
    tagID: 3,
  },
  {
    productID: 1,
    tagID: 1,
  },
  {
    productID: 1,
    tagID: 2,
  },
  {
    productID: 2,
    tagID: 1,
  },
  {
    productID: 2,
    tagID: 4,
  },
  {
    productID: 3,
    tagID: 5,
  },
  {
    productID: 4,
    tagID: 3,
  },
];

export default function ProductTagsPage() {
  const [prodTags, setProdTags] = useState(data);
  const [prodInput, setProdInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  const handleRowAdd = (event) => {
    event.preventDefault();
    setProdTags(prodTags.concat({ productID: prodInput, tagID: tagInput }));
  };

  const handleRowChange = (index) => (event) => {
    const { name, value } = event.target;
    const newProdTags = [...prodTags];
    newProdTags[index][name] = value;
    setProdTags(newProdTags);
  };

  const handleRowDelete = (index) => (event) => {
    const newProdTags = [...prodTags];
    newProdTags.splice(index, 1);
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
                <td>
                  <input
                    type="number"
                    name="productID"
                    value={p.productID}
                    onChange={handleRowChange(index)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="tagID"
                    value={p.tagID}
                    onChange={handleRowChange(index)}
                  />
                </td>
                <td>
                  <button>Update</button>
                </td>
                <td>
                  <button onClick={handleRowDelete(index)}>Delete</button>
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
        <button onSubmit={handleRowAdd}>Add</button>
      </form>
    </Layout>
  );
}

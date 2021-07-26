import Layout from "@/components/Layout";
import { useState } from "react";
import styles from "@/styles/Table.module.css";

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

const data = [
  {
    id: 1,
    userID: 1,
    name: "Cryptocurrency Web App React JS Template",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageURL: "/images/sample/template-1.jpg",
    price: 60,
    datePosted: new Date(2021, 5, 9).toISOString().split("T")[0],
    lastUpdated: new Date(2021, 5, 9).toISOString().split("T")[0],
  },
  {
    id: 2,
    userID: 1,
    name: "Custom Interactive Map jQuery Plugin",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageURL: "/images/sample/template-2.jpg",
    price: 30,
    datePosted: new Date(2021, 5, 9).toISOString().split("T")[0],
    lastUpdated: new Date(2021, 5, 9).toISOString().split("T")[0],
  },
  {
    id: 3,
    userID: 1,
    name: "React Personal Portfolio Template + React Hooks",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageURL: "/images/sample/template-3.jpg",
    price: 50,
    datePosted: new Date(2021, 5, 9).toISOString().split("T")[0],
    lastUpdated: new Date(2021, 5, 9).toISOString().split("T")[0],
  },
  {
    id: 4,
    userID: 1,
    name: "Multipurpose eCommerce WordPress Theme",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageURL: "/images/sample/template-4.jpg",
    price: 22,
    datePosted: new Date(2021, 5, 9).toISOString().split("T")[0],
    lastUpdated: new Date(2021, 5, 9).toISOString().split("T")[0],
  },
  {
    id: 5,
    userID: 1,
    name: "Marketing HTML Landing Page",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageURL: "/images/default_image.jpg",
    price: 47,
    datePosted: new Date(2021, 5, 9).toISOString().split("T")[0],
    lastUpdated: new Date(2021, 5, 9).toISOString().split("T")[0],
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(data);
  const [filter, setFilter] = useState("");

  const handleRowChange = (index) => (event) => {
    const { name, value } = event.target;
    const newProducts = [...products];
    newProducts[index][name] = value;
    setProducts(newProducts);
  };

  const handleSearch = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Layout>
      <h1>Products</h1>
      <p>Represents a web template product</p>
      <p>Supported operations: Create, Read, Update</p>
      <input
        type="text"
        value={filter}
        placeholder="Search by Name"
        onChange={handleSearch}
      />
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
            {products
              .filter((product) =>
                product.name.toLowerCase().includes(filter.toLowerCase())
              )
              .map((product, index) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
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
                    <button>Update</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <h3>Add new product</h3>
      <form className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <input type="text" placeholder="UserID" />
          <input type="text" placeholder="Name" />
          <textarea placeholder="Description" rows="3" cols="50" />
          <input type="number" min="0" placeholder="Price" />
          <input type="text" placeholder="Image URL" />
        </div>
        <div>
          <button>Add</button>
        </div>
      </form>
    </Layout>
  );
}

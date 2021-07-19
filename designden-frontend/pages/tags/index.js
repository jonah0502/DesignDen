import Layout from "@/components/Layout";
import styles from "@/styles/Table.module.css";
import { useState } from "react";

const tagHeaders = ["TagID", "TagName", "Update", "Delete"];

const tagData = [
  {
    id: 0,
    tagName: "HTML",
  },
  {
    id: 1,
    tagName: "CSS",
  },
  {
    id: 2,
    tagName: "Wordpress",
  },
  {
    id: 3,
    tagName: "React",
  },
  {
    id: 4,
    tagName: "Angular",
  },
  {
    id: 5,
    tagName: "Vue",
  },
  {
    id: 6,
    tagName: "JQuery",
  },
];

export default function TagsPage() {
  const [tags, setTags] = useState(tagData);
  const [tagInput, setTagInput] = useState("");

  const handleRowAdd = (event) => {
    event.preventDefault();
    const newID = Math.max(...tags.map((tag) => tag.id)) + 1;
    console.log(newID);
    setTags(tags.concat({ id: newID, tagName: tagInput }));
  };

  const handleRowChange = (index) => (event) => {
    const { name, value } = event.target;
    const newTags = [...tags];
    newTags[index][name] = value;
    setTags(newTags);
  };

  const handleRowDelete = (index) => (event) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const handleTagChange = (event) => {
    setTagInput(event.target.value);
  };

  return (
    <Layout>
      <h1>Tags</h1>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              {tagHeaders.map((header) => {
                return <th key={header}>{header}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {tags.map((tag, index) => (
              <tr key={tag.id}>
                <td>{tag.id}</td>
                <td>
                  <input
                    type="text"
                    name="tagName"
                    value={tag.tagName}
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
      <form onSubmit={handleRowAdd}>
        <h3>Add a new tag</h3>
        <input
          type="text"
          placeholder="TagName"
          value={tagInput}
          onChange={handleTagChange}
        />
        <button type="submit">Add</button>
      </form>
    </Layout>
  );
}

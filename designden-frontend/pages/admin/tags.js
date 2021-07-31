import Layout from "@/components/Layout";
import styles from "@/styles/Table.module.css";
import tagService from "../../services/tags.js";
import { useEffect, useState } from "react";

const tagHeaders = ["TagID", "TagName", "Update", "Delete"];

export default function TagsPage() {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    tagService
      .getAll()
      .then((response) => {
        setTags(response);
      })
      .catch((e) => console.log(e));
  }, []);

  const addTag = (event) => {
    event.preventDefault();
    tagService
      .create({ tagName: tagInput })
      .then((response) => {
        setTags(tags.concat({ tagID: response.id, tagName: tagInput }));
        setTagInput("");
      })
      .catch((e) => console.log(e));
  };

  const updateTag = (index) => (event) => {
    event.preventDefault();
    tagService
      .update(tags[index].tagID, tags[index])
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.log(e));
  };

  const deleteTag = (index) => (event) => {
    event.preventDefault();
    tagService
      .remove(tags[index].tagID)
      .then(() => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
      })
      .catch((e) => console.log(e));
  };

  const handleRowChange = (index) => (event) => {
    const { name, value } = event.target;
    const newTags = [...tags];
    newTags[index][name] = value;
    setTags(newTags);
  };

  const handleTagChange = (event) => {
    setTagInput(event.target.value);
  };

  return (
    <Layout>
      <h1>Tags</h1>
      <p>Supported operations: Create, Read, Update, Delete</p>
      <br />
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
              <tr key={tag.tagID}>
                <td>{tag.tagID}</td>
                <td>
                  <input
                    type="text"
                    name="tagName"
                    value={tag.tagName}
                    onChange={handleRowChange(index)}
                  />
                </td>
                <td>
                  <button onClick={updateTag(index)}>Update</button>
                </td>
                <td>
                  <button onClick={deleteTag(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <form className={styles.formContainer}>
        <h3>Add a new tag</h3>
        <input
          type="text"
          placeholder="TagName"
          value={tagInput}
          onChange={handleTagChange}
        />
        <button onClick={addTag}>Add</button>
      </form>
    </Layout>
  );
}

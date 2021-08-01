import Layout from "@/components/Layout";
import Message from "@/components/Message.js";
import styles from "@/styles/Table.module.css";
import tagService from "../../services/tags.js";
import { useEffect, useState } from "react";

const tagHeaders = ["TagID", "TagName", "Update", "Delete"];

export default function TagsPage() {
  // initalize state variables
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [message, setMessage] = useState({ text: null, isError: false });

  // get all tags from database on first page load
  useEffect(() => {
    tagService
      .getAll()
      .then((response) => {
        setTags(response);
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

  // add tag to database on form button click
  const addTag = (event) => {
    event.preventDefault();
    tagService
      .create({ tagName: tagInput })
      .then((response) => {
        setTags(tags.concat({ tagID: response.id, tagName: tagInput }));
        setTagInput("");
        displayMessage(response.message, false);
      })
      .catch((error) => {
        let errMsg;
        if (error.response) {
          errMsg = error.response.data;
        } else {
          errMsg = "Error: Unable to add tag, missing required field.";
        }
        displayMessage(errMsg, true);
      });
  };

  // update tag from database on row button click
  const updateTag = (index) => (event) => {
    event.preventDefault();
    tagService
      .update(tags[index].tagID, tags[index])
      .then((response) => {
        displayMessage(response, false);
      })
      .catch((error) => {
        displayMessage(error.response.data, true);
      });
  };

  // delete tag from database on row button click
  const deleteTag = (index) => (event) => {
    event.preventDefault();
    tagService
      .remove(tags[index].tagID)
      .then((response) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
        displayMessage(response, false);
      })
      .catch((error) => {
        displayMessage(error.response.data, true);
      });
  };

  // handle input changes for each row
  const handleRowChange = (index) => (event) => {
    const { name, value } = event.target;
    const newTags = [...tags];
    newTags[index][name] = value;
    setTags(newTags);
  };

  // handle new tag input changes
  const handleTagChange = (event) => {
    setTagInput(event.target.value);
  };

  return (
    <Layout>
      <Message message={message.text} isError={message.isError} />
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
          placeholder="TagName*"
          value={tagInput}
          onChange={handleTagChange}
        />
        <button onClick={addTag}>Add</button>
      </form>
    </Layout>
  );
}

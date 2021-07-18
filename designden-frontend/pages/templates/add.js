import Layout from "@/components/Layout";
import { useState } from "react";

export default function AddTemplatesPage() {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  // handle change for tag input
  const handleTagChange = (event) => {
    setTag(event.target.value);
  };

  // handle submit for adding tags
  const addTag = (event) => {
    event.preventDefault();
    setTags((oldTags) => [...oldTags, tag]);
  };

  return (
    <Layout title="Add New Template">
      <h1>Add Template</h1>
      <form>
        <div>
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Description" />
          <input type="text" placeholder="Image URL" />
          <input type="number" placeholder="Price" min="0" step="0.01" />
        </div>
        <div>
          <input type="text" placeholder="Tag" onChange={handleTagChange} />
          <button onClick={addTag}>Add Tag</button>
        </div>
        <div>
          <p>Tags: {tags.join(", ")}</p>
        </div>
        <button>Submit</button>
      </form>
    </Layout>
  );
}

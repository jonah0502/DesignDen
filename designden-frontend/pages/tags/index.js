import Layout from "@/components/Layout";
import { useState } from "react";

const tagHeaders = ["TagID", "TagName"];

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

  return (
    <Layout>
      <h1>Tags</h1>
      <table>
        <thead>
          <tr>
            {tagHeaders.map((header) => {
              return <td key={header}>{header}</td>;
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
    </Layout>
  );
}

import Layout from "@/components/Layout";
import styles from "@/styles/Table.module.css";
import { useState } from "react";

const reviewHeaders = [
  "ReviewID",
  "ProductID",
  "UserID",
  "Stars",
  "Comment",
  "Date",
  "Update",
  "Delete",
];

const reviewData = [
  {
    id: 0,
    productID: 1,
    userID: 0,
    stars: 4,
    comment: "Great product",
    date: new Date(2021, 6, 15).toISOString().split("T")[0],
  },
  {
    id: 1,
    productID: 4,
    userID: 2,
    stars: 3,
    comment: "",
    date: new Date(2021, 6, 17).toISOString().split("T")[0],
  },
  {
    id: 2,
    productID: 2,
    userID: 4,
    stars: 5,
    comment: "I really like this template!",
    date: new Date(2021, 6, 17).toISOString().split("T")[0],
  },
  {
    id: 3,
    productID: 1,
    userID: 4,
    stars: 4,
    comment: "",
    date: new Date(2021, 6, 18).toISOString().split("T")[0],
  },
];

export default function ReviewPage() {
  const [reviews, setReviews] = useState(reviewData);

  const handleRowChange = (index) => (event) => {
    const { name, value } = event.target;
    const newReviews = [...reviews];
    newReviews[index][name] = value;
    setReviews(newReviews);
  };

  const handleRowDelete = (index) => (event) => {
    const newReviews = [...reviews];
    newReviews.splice(index, 1);
    setReviews(newReviews);
  };

  return (
    <Layout>
      <h1>Reviews</h1>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              {reviewHeaders.map((header) => {
                return <th key={header}>{header}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={review.id}>
                <td>{review.id}</td>
                <td>{review.productID}</td>
                <td>{review.userID}</td>
                <td>
                  <input
                    type="number"
                    name="stars"
                    value={review.stars}
                    min="1"
                    max="5"
                    onChange={handleRowChange(index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="comment"
                    value={review.comment}
                    onChange={handleRowChange(index)}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    name="date"
                    value={review.date}
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
      <h3>Add new review</h3>
      <form className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <input type="text" placeholder="ProductID" />
          <input type="text" placeholder="UserID" />
          <input type="number" min="0" max="5" placeholder="Stars" />
          <textarea placeholder="Comment" rows="3" cols="50" />
        </div>
        <div>
          <button>Add</button>
        </div>
      </form>
    </Layout>
  );
}

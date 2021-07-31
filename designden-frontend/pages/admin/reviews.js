import Layout from "@/components/Layout";
import styles from "@/styles/Table.module.css";
import reviewService from "../../services/reviews";
import { useEffect, useState } from "react";

const reviewHeaders = [
  "ReviewID",
  "ProductID",
  "UserID",
  "Stars",
  "Comment",
  "Date",
  "LastUpdated",
  "Update",
  "Delete",
];

export default function ReviewPage() {
  // initalize state variables
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ reviewText: null });

  // get all reviews from database on first page load
  useEffect(() => {
    reviewService
      .getAll()
      .then((response) => {
        setReviews(response);
      })
      .catch((e) => console.log(e));
  }, []);

  // add new review to database from button click
  const addReview = (event) => {
    event.preventDefault();
    const today = new Date().toISOString().slice(0, 10);
    let newReview = { ...reviewForm, datePosted: today, lastUpdated: today };
    reviewService.create(newReview).then((response) => {
      newReview = { ...newReview, reviewID: response.id };
      setReviews(reviews.concat(newReview));
      setReviewForm({ reviewText: null });
    });
  };

  // update review from row button click
  const updateReview = (index) => (event) => {
    event.preventDefault();
    const today = new Date().toISOString().slice(0, 10);
    const newReview = { ...reviews[index], lastUpdated: today };
    reviewService
      .update(newReview.reviewID, newReview)
      .then(() => {
        setReviews(
          reviews.map((review) =>
            review.reviewID !== newReview.reviewID ? review : newReview
          )
        );
      })
      .catch((e) => console.log(e));
  };

  // delete review from row button click
  const deleteReview = (index) => (event) => {
    event.preventDefault();
    reviewService
      .remove(reviews[index].reviewID)
      .then(() => {
        const newReviews = [...reviews];
        newReviews.splice(index, 1);
        setReviews(newReviews);
      })
      .catch((e) => console.log(e));
  };

  // handle input changes for each row
  const handleRowChange = (index) => (event) => {
    const { name, value } = event.target;
    const newReviews = [...reviews];
    newReviews[index][name] = value;
    setReviews(newReviews);
  };

  return (
    <Layout>
      <h1>Reviews</h1>
      <p>Supported operations: Create, Read, Update, Delete</p>
      <br />
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
              <tr key={review.reviewID}>
                <td>{review.reviewID}</td>
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
                    name="reviewText"
                    value={review.reviewText || ""}
                    onChange={handleRowChange(index)}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    name="datePosted"
                    value={review.datePosted}
                    onChange={handleRowChange(index)}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    name="lastUpdated"
                    value={review.lastUpdated}
                    onChange={handleRowChange(index)}
                  />
                </td>
                <td>
                  <button onClick={updateReview(index)}>Update</button>
                </td>
                <td>
                  <button onClick={deleteReview(index)}>Delete</button>
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
          <input
            type="text"
            placeholder="ProductID"
            value={reviewForm.productID || ""}
            onChange={(e) =>
              setReviewForm({ ...reviewForm, productID: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="UserID"
            value={reviewForm.userID || ""}
            onChange={(e) =>
              setReviewForm({ ...reviewForm, userID: e.target.value })
            }
          />
          <input
            type="number"
            min="0"
            max="5"
            placeholder="Stars"
            value={reviewForm.stars || ""}
            onChange={(e) =>
              setReviewForm({ ...reviewForm, stars: e.target.value })
            }
          />
          <textarea
            placeholder="Comment"
            rows="3"
            cols="50"
            value={reviewForm.reviewText || ""}
            onChange={(e) =>
              setReviewForm({ ...reviewForm, reviewText: e.target.value })
            }
          />
        </div>
        <div>
          <button onClick={addReview}>Add</button>
        </div>
      </form>
    </Layout>
  );
}

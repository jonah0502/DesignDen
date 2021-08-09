import Layout from "@/components/Layout";
import Message from "@/components/Message.js";
import styles from "@/styles/Table.module.css";
import reviewService from "../../services/reviews";
import { getProductList } from "../../services/products";
import { getUserList } from "../../services/users";
import { useEffect, useState } from "react";

const reviewHeaders = [
  "ReviewID",
  "ProductID",
  "Product",
  "UserID",
  "User",
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
  const [message, setMessage] = useState({ text: null, isError: false });
  const [productList, setProductList] = useState([]);
  const [userList, setUserList] = useState([]);

  // runs on first page load only
  useEffect(() => {
    // get all reviews from database
    reviewService
      .getAll()
      .then((response) => {
        setReviews(response);
      })
      .catch((e) => console.log(e));
    // get the list of products for the form
    getProductList()
      .then((response) => {
        setProductList(response);
      })
      .catch((e) => console.log(e));
    // get the list of users for the form
    getUserList()
      .then((response) => {
        setUserList(response);
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

  // add new review to database from button click
  const addReview = (event) => {
    event.preventDefault();
    const today = new Date().toISOString().slice(0, 10);
    const productID =
      productList
        .map((product) => product.name)
        .indexOf(reviewForm.productName) + 1;
    const userID =
      userList.map((user) => user.name).indexOf(reviewForm.userName) + 1;
    let newReview = {
      ...reviewForm,
      productID: productID,
      userID: userID,
      datePosted: today,
      lastUpdated: today,
    };
    reviewService
      .create(newReview)
      .then((response) => {
        newReview = { ...newReview, reviewID: response.id };
        setReviews(reviews.concat(newReview));
        displayMessage(response.message, false);
      })
      .catch((error) => {
        let errMsg;
        if (error.response) {
          errMsg = error.response.data;
        } else {
          errMsg = "Error: Unable to add review, missing required fields.";
        }
        displayMessage(errMsg, true);
      });
  };

  // update review from row button click
  const updateReview = (index) => (event) => {
    event.preventDefault();
    const today = new Date().toISOString().slice(0, 10);
    const newReview = { ...reviews[index], lastUpdated: today };
    reviewService
      .update(newReview.reviewID, newReview)
      .then((response) => {
        setReviews(
          reviews.map((review) =>
            review.reviewID !== newReview.reviewID ? review : newReview
          )
        );
        displayMessage(response, false);
      })
      .catch((error) => {
        displayMessage(error.response.data, true);
      });
  };

  // delete review from row button click
  const deleteReview = (index) => (event) => {
    event.preventDefault();
    reviewService
      .remove(reviews[index].reviewID)
      .then((response) => {
        const newReviews = [...reviews];
        newReviews.splice(index, 1);
        setReviews(newReviews);
        displayMessage(response, false);
      })
      .catch((error) => {
        displayMessage(error.response.data, true);
      });
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
      <Message message={message.text} isError={message.isError} />
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
                <td>{review.productName}</td>
                <td>{review.userID}</td>
                <td>{review.userName}</td>
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
          <select
            value={reviewForm.productName}
            onChange={(e) =>
              setReviewForm({ ...reviewForm, productName: e.target.value })
            }
          >
            <option value="">Select product</option>
            {productList.map((product) => (
              <option key={product.productID} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
          <select
            value={reviewForm.userName}
            onChange={(e) =>
              setReviewForm({ ...reviewForm, userName: e.target.value })
            }
          >
            <option value="">Select user</option>
            {userList.map((user) => (
              <option key={user.userID} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
          <br />
          <input
            type="number"
            min="0"
            max="5"
            placeholder="Stars*"
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

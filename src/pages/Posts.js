import React from "react";
import { database } from "../firebase";
import { useEffect, useState } from "react";
import { onChildAdded, ref as databaseRef } from "firebase/database";

const REVIEW_FOLDER_NAME = "review";

const ReviewFeed = () => {
  const [reviews, setReview] = useState([]);

  useEffect(() => {
    const reviewRef = databaseRef(database, REVIEW_FOLDER_NAME);
    // onChildAdded will return data for every child at the reference and every subsequent new child
    onChildAdded(reviewRef, (data) => {
      // Add subsequent child to local component state, initialising a new array to trigger re-render
      // Note the use of functional state update to access previous posts state
      // https://reactjs.org/docs/hooks-reference.html#functional-updates
      setReview((prevReviewState) => [
        ...prevReviewState,
        // Store post key so we can use it as a key in our list items when rendering posts
        { key: data.key, val: data.val() },
      ]);
      console.log(reviews);
    });
  }, []);

  // const renderReviews = (allReviews) => {
  //   allReviews.map((review) => review.val);
  // };
  // console.log(renderReviews(reviews));

  return (
    <>
      <div>Reviews</div>
      <>To put in reviews here</>
      {/* <h2>{renderReviews(reviews)}</h2> */}
      {/* {reviews.map((review, index) => (
        <div key={index}>
          <p>Name: {review.val}</p>
        </div>
      ))} */}
    </>
  );
};

export default ReviewFeed;

import React, { useState, useEffect } from "react";
import { Modal, Rate } from "antd";
import Title from "../../shared/Title/Title";
import Button from "../../shared/Button/Button";
import { toast } from "sonner";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authslice";
import { useCreateReviewMutation } from "../../redux/Api/reviewsApi/reviewsApi";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [newFeedback, setNewFeedback] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const user = useAppSelector(useCurrentUser);
  const [createReview, { isLoading }] = useCreateReviewMutation();

//   const fetchReviews = async () => {
//     try {
//       const response = await axios.get("/api/reviews"); // Adjust URL as necessary
//       setReviews(response.data.data);
//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, []);

  const handleFeedbackSubmit = async () => {
    if (!user) {
      toast.error("You need to be logged in to submit a review.");
      return;
    }

    try {
      const reviewData = {
        user: user._id,
        rating: newRating,
        feedback: newFeedback,
      };

      await createReview(reviewData).unwrap(); 
      toast.success("Thanks for your feedback");
      setNewFeedback("");
      setNewRating(0);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback");
    }
  };

  const handleAddReviewClick = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const averageRating = reviews.length > 0 ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 0;

  return (
    <div className="relative lg:mt-8 md:mt-6 mt-4">
      <div className="lg:flex items-center justify-between gap-4">
        <Title text="Customer Reviews" level={1} className="text-xl title" />
        <Button
          text="Add Review"
          type="submit"
          className="bg-white text-black"
          onClick={handleAddReviewClick}
        />
      </div>

      <h3 className="mt-4">Overall Rating: {averageRating.toFixed(1)} ⭐</h3>

      <Modal
        title="Add a Review"
        visible={isModalVisible}
        onOk={handleFeedbackSubmit}
        onCancel={handleCancel}
        confirmLoading={isLoading} // Show loading state while submitting
      >
        <div>
          <Rate
            allowHalf
            onChange={setNewRating}
            value={newRating}
            className="mb-4"
          />
          <textarea
            className="border w-full p-2"
            rows="4"
            placeholder="Write your feedback..."
            value={newFeedback}
            onChange={(e) => setNewFeedback(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ReviewSection;

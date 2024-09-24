import { useState } from "react";
import { Modal, Rate } from "antd";
import Title from "../../shared/Title/Title";
import { toast } from "sonner";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authslice";
import {
  useCreateReviewMutation,
  useGetAllReviewQuery,
} from "../../redux/Api/reviewsApi/reviewsApi";
import { Review } from "../../types/reviewTypes/reviewTypes";
import { useNavigate } from "react-router-dom";
import Button from "../../shared/Button/Button";

const ReviewSection: React.FC = () => {
  const [newFeedback, setNewFeedback] = useState<string>("");
  const [newRating, setNewRating] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [showAllReviews, setShowAllReviews] = useState<boolean>(false);
  const navigate = useNavigate(); // Correct hook usage
  const user = useAppSelector(useCurrentUser);
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const { data: reviewsData } = useGetAllReviewQuery(undefined);
  const reviews: Review[] = Array.isArray(reviewsData?.data)
    ? reviewsData.data
    : [];

  const handleFeedbackSubmit = async (): Promise<void> => {
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

  const handleAddReviewClick = (): void => {
    if (!user) {
      toast.error("You need to be logged in to leave a review.");
      navigate("/auth/login");
    } else {
      setIsModalVisible(true);
    }
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

      return (
        <div className="relative lg:mt-8 md:mt-6 mt-4 ">
          <div className="flex items-center justify-between gap-4">
            <Title text="Customer Reviews" level={1} className="text-xl title" />
            <Button
              type="button"
              text="Add Review"
              onClick={handleAddReviewClick}
              category="secondary"
            />
          </div>
          <h3 className="mt-4 text-lg">
            Overall Rating: {averageRating.toFixed(1)} ⭐
          </h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
            <h4 className="text-lg font-semibold col-span-2">Recent Reviews:</h4>
            {/* Show all reviews or the latest two based on state */}
            {(showAllReviews ? reviews : reviews.slice(-2)).map((review: Review) => (
              <div key={review._id} className="border p-4 rounded shadow">
                <Rate disabled value={review.rating} />
                <p className="mt-1 font-bold">
                  {review.user ? review.user.name : "Anonymous"}: {review.feedback}
                </p>
              </div>
            ))}
            {reviews.length > 2 && (
              <Button
                className="mt-2 col-span-2 lg:w-1/6 mx-auto"
                text={showAllReviews ? "See Less Reviews" : "See All Reviews"}
                type="button"
                category="primary"
                onClick={() => setShowAllReviews(!showAllReviews)} // Toggle state
              />
            )}
          </div>
          {/* Modal for adding a review */}
          <Modal
            title="Add a Review"
            visible={isModalVisible}
            onOk={handleFeedbackSubmit}
            onCancel={() => setIsModalVisible(false)}
            confirmLoading={isLoading}
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
                rows={4}
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

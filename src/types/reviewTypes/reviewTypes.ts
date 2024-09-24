export interface UserReview {
  _id: string; 
  name: string; 
}
export interface Review {
    _id: string;
    user?: UserReview; 
    rating: number;
    feedback: string;
  }
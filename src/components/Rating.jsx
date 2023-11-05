import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const Rating = ({ rating, numReviews, caption }) => {
  return (
    <div className="rating flex items-center font-poppins">
      <div className="stars flex text-rating">
        {/* first star */}
        {rating > 1 ? (
          <BsStarFill />
        ) : rating >= 0.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
        {/* second star */}
        {rating > 2 ? (
          <BsStarFill />
        ) : rating >= 1.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
        {/* third star */}
        {rating > 3 ? (
          <BsStarFill />
        ) : rating >= 2.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
        {/* fourth star */}
        {rating > 4 ? (
          <BsStarFill />
        ) : rating >= 3.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
        {/* fifth star */}
        {rating === 5 ? (
          <BsStarFill />
        ) : rating >= 4.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </div>
      <div className="num-reviews ml-1 text-accent">
        {caption
          ? caption
          : numReviews > 1000
          ? (numReviews / 1000).toFixed(1) + "k"
          : numReviews}
      </div>
    </div>
  );
};

export default Rating;

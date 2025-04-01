import { memo, useEffect, useState } from "react";
import { Loader2, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

import PropTypes from "prop-types";
import { Image } from "../layouts";
import useMeStore from "@/zustand/useMeStore";
import { toast } from "sonner";
import { apiCreateRating, apiGetRating } from "@/apis/rating";
import { generalDefaultAvatar } from "@/lib/utils";
import { apiCheckForInappropriateContent } from "@/apis/external";
import { apiCreateNotification } from "@/apis/notification";

const RatingButton = ({ avgStar, idPost, idUserWrite, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [personalRating, setPersonalRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [ratings, setRatings] = useState([]);
  const { me } = useMeStore();

  const handleStarClick = (rating) => {
    setPersonalRating(rating);
  };

  const handleStarHover = (rating) => {
    setHoverRating(rating);
  };

  // const handleSubmitRating = async () => {
  //   setIsLoading(true);
  //   if (!me) return toast.error("Bạn cần đăng nhập để  đánh giá");
  //   // const hasInappropriateContent = await apiCheckForInappropriateContent(
  //   //   comment
  //   // );
  //   // if (hasInappropriateContent) {
  //   //   isLoading(false);
  //   //   return toast.error(
  //   //     "Nhận xét của bạn chứa từ ngữ không phù hợp. Vui lòng sửa đổi."
  //   //   );
  //   // }

  //   const response = await apiCreateRating({
  //     idPost,
  //     start: personalRating,
  //     content: comment,
  //   });
  //   if (response.data.success) {
  //     const response1 = await apiCreateNotification({
  //       idUser: idUserWrite,
  //       idPost: idPost,
  //       content: `Bài viết "${title}" của bạn nhận được đánh giá ${personalRating} sao.`,
  //       type: "post_rating",
  //     });
  //     if (response1.data.success) {
  //       isLoading(false);
  //       setIsOpen(false);
  //       window.location.reload();
  //     }
  //   }
  //   isLoading(false);
  // };
  const handleSubmitRating = async () => {
    setIsLoading(true);

    if (!me) {
      toast.error("Bạn cần đăng nhập để đánh giá");
      setIsLoading(false); // Set loading state to false before returning
      return;
    }

    try {
      // Optional: Check for inappropriate content (comment)

      // const hasInappropriateContent = await apiCheckForInappropriateContent(comment);
      // if (hasInappropriateContent) {
      //   toast.error("Nhận xét của bạn chứa từ ngữ không phù hợp. Vui lòng sửa đổi.");
      //   setIsLoading(false);
      //   return;
      // }

      // Create the rating
      const response = await apiCreateRating({
        idPost,
        start: personalRating,
        content: comment,
      });

      if (response.data.success) {
        // Create a notification if the rating was successful
        const response1 = await apiCreateNotification({
          idUser: idUserWrite,
          idPost: idPost,
          content: `Bài viết "${title}" của bạn nhận được đánh giá ${personalRating} sao.`,
          type: "post_rating",
        });

        if (response1.data.success) {
          setIsOpen(false);
          window.location.reload();
          return; // Exit after reloading
        } else {
          toast.error("Failed to create notification. Please try again.");
        }
      } else {
        toast.error("Failed to create rating. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Ensure loading is set to false in the finally block
    }
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const r = await apiGetRating(idPost);
        if (r.data.success) {
          setRatings(r?.data?.data);
        } else {
          // Handle the case where success is false
          toast.error(r.data.message || "Failed to fetch ratings");
        }
      } catch (error) {
        toast.error(error?.r?.message);
      }
    };
    fetch();
  }, []);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="flex-1 relative">
          <Star size={24} className="relative " />
          <span className="absolute left-0 right-0 bottom-[-2px]  text-xs font-bold">
            {avgStar.toFixed(1)}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center justify-center">
            <Star size={24} className="mr-2" />
            <span>{avgStar.toFixed(1)}</span>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14">
              <Image
                src={me?.avatar}
                alt={"avatar"}
                fallbackSrc={generalDefaultAvatar(me?.fullname)}
              />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => handleStarHover(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    fill={
                      (hoverRating || personalRating) >= star ? "gold" : "none"
                    }
                    stroke={
                      (hoverRating || personalRating) >= star
                        ? "gold"
                        : "currentColor"
                    }
                    className="cursor-pointer"
                  />
                ))}
              </div>
              <Textarea
                placeholder="Viết nhận xét của bạn..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="!h-14 w-full"
              />
              <Button onClick={handleSubmitRating}>
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  " Gửi nhận xét"
                )}
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            {ratings.length === 0 && <div>Không có ai đánh giá cả</div>}
            {ratings?.map((rating) => (
              <div key={rating.id} className="flex items-start space-x-4">
                <div className="w-14 h-14">
                  <Image
                    src={rating?.rUser.avatar}
                    alt={"avatar"}
                    fallbackSrc={generalDefaultAvatar(rating?.rUser.fullname)}
                    className="border rounded-full p-1 w-14 h-14"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">
                      {rating.rUser?.fullname}
                    </span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          fill={rating.start >= star ? "gold" : "none"}
                          stroke={
                            rating.start >= star ? "gold" : "currentColor"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{rating.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default memo(RatingButton);
RatingButton.propTypes = {
  avgStar: PropTypes.objectOf([PropTypes.string, PropTypes.number]),
  idPost: PropTypes.number.isRequired,
};

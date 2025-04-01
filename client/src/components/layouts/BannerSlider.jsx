import { Banner } from "@/lib/contants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useEffect, useRef, useState } from "react";

const BannerSlider = () => {
  const [api, setApi] = useState(null);
  const intervalRef = useRef();
  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      api?.scrollNext();
    }, 10000);
  };
  useEffect(() => {
    if (!api) return;
    startAutoScroll();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [api]);

  return (
    <div className="w-full h-1/3 ">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {Banner?.map((el) => (
            <CarouselItem key={el.id}>
              <img
                src={el.imgUrlBanner}
                alt="Banner"
                className="w-full aspect-[3/1] object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 bg-transparent" />
        <CarouselNext className="right-2 bg-transparent" />
      </Carousel>
    </div>
  );
};

export default BannerSlider;

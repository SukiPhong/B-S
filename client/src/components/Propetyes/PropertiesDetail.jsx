import { useEffect, useState } from "react";
import { DetailItems, ImagesPropertiesDetail, PosterInfoBox } from ".";
import { Card, CardContent } from "../ui/card";
import { useParams } from "react-router-dom";
import { apiGetPrototypesDetail } from "@/apis/post";
import { changePriceToString, description } from "@/lib/fn";
import { Bath, Bed, Fence, Flag, Heart, Proportions, Share2, Sofa, Star } from 'lucide-react';
import { Button } from "../ui/button";
import { Map } from "../map";
import WishListItem from "./../Wishlist/WishListItem";
import { RatingButton } from "../rating";
import { SkeletonCard } from "../layouts";

const PropertiesDetail = () => {
  const { idPost } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [detailPrototypes, setDetailPrototypes] = useState("");
  useEffect(() => {
    const fetchPrototypesDetail = async () => {
      const response = await apiGetPrototypesDetail(idPost);
      if (response.data.success === true) {
        setDetailPrototypes(response.data.data);
        setIsLoading(false);
      }
    };
    fetchPrototypesDetail();
    window.scrollTo(0, 0);
  }, [idPost]);
  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <SkeletonCard className="w-full h-full top-24" />
      </div>
    );
  return (
    <div className="mx-auto w-full max-w-5xl p-4 lg:flex lg:space-x-4">
      <div className="w-full lg:w-[70%] flex-col bg-slate-100">
        <ImagesPropertiesDetail images={detailPrototypes?.images} />
        <div>
          <Card className="border-t-0 border-b-0">
            <CardContent className="p-6">
              <div className="space-y-4 sm:space-y-0 sm:flex sm:justify-between sm:items-center">
                <div className="space-y-2 sm:space-y-0 sm:flex sm:gap-6 sm:items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">{`Mức giá (${detailPrototypes.priceUnits})`}</p>

                    <p className="font-semibold">
                      {detailPrototypes.price === "Thoản thuận"
                        ? detailPrototypes.price
                        : changePriceToString(
                            String(detailPrototypes?.price)
                          )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Diện tích</p>
                    <p className="font-semibold">
                      {detailPrototypes?.size} m²
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phòng ngủ</p>
                    <p className="font-semibold">
                      {detailPrototypes.bedroom} PN
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-2 justify-end mt-4 sm:mt-0">
                  <Button variant="ghost" size="icon">
                    <Share2 size={20} />
                  </Button>
                  <RatingButton
                    avgStar={detailPrototypes.avgStar}
                    idPost={detailPrototypes.id}
                    idUserWrite={detailPrototypes?.rUser?.id}
                    title={detailPrototypes?.title}
                  />
                  <WishListItem id={detailPrototypes.id} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Description */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Mô tả</h2>
              <p>{detailPrototypes?.description}</p>
            </CardContent>
          </Card>

          {/* Property Details */}
          <Card>
            <CardContent className="p-6 border-t-0 border-b-0">
              <h2 className="text-xl font-semibold mb-4">Thông tin chi tiết</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4  ">
                {[
                  {
                    icon: <Proportions />,
                    label: "Diện tích",
                    value: detailPrototypes.size,
                  },
                  {
                    icon: <Bed />,
                    label: "Số phòng ngủ",
                    value: detailPrototypes.bedroom,
                  },
                  {
                    icon: <Bath />,
                    label: "Số phòng tắm",
                    value: detailPrototypes.bathroom,
                  },
                  {
                    icon: <Sofa />,
                    label: "Nội thất",
                    value: detailPrototypes.interior,
                  },
                  {
                    icon: <Fence />,
                    label: "Ban công",
                    value: detailPrototypes.balonDirection,
                  },
                ].map((item, index) => (
                  <div key={index} className={index % 2 === 0 ? "mr-2" : ""}>
                    <DetailItems
                      icon={item.icon}
                      label={item.label}
                      value={  
                        item.label === "Diện tích"   
                          ? `${item.value} m²`  
                          : item.value  
                      }  
                      className='text-xl font-roboto font-bold'
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          {/* Map */}
          <Card className="border-t-0 border-b-0">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Vị trí trên bản đồ</h2>
              <div className="aspect-video w-full rounded-lg flex items-center justify-center relative z-30">
                <Map address={detailPrototypes.address} />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className=" w-full py-4 px-2">
          <p className="text-xs font-roboto">
            {description(
              detailPrototypes.title,
              detailPrototypes.id,
              detailPrototypes.rUser.fullname
            )}
          </p>
        </div>
      </div>
      <div className="w-full mt-4 lg:mt-0 lg:w-[30%] lg:sticky lg:top-4 p-2">
        <PosterInfoBox
          fullname={detailPrototypes?.rUser?.fullname}
          avatar={detailPrototypes?.rUser?.avatar}
          phone={detailPrototypes?.rUser?.phone}
          id={detailPrototypes?.idUser}
        />
      </div>
    </div>
  );
};

export default PropertiesDetail;


import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

const Services = () => {
  return (
    <section className=" py-16 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#001C43]">Dịch vụ của chúng tôi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Mua", "Bán", "Cho Thuê"].map((service) => (
            <Card key={service} className="text-center">
              <CardHeader>
                <CardTitle className='text-main font-roboto'>{service}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  {service === "Mua"
                    ? "Khám phá các sản phẩm chất lượng cao với giá cả hợp lý. Chúng tôi cam kết cung cấp dịch vụ tốt nhất để bạn tìm thấy sản phẩm hoàn hảo cho nhu cầu của mình."
                    : service === "Bán"
                    ? "Đem đến cho bạn những giải pháp hiệu quả để bán hàng nhanh chóng và dễ dàng. Chúng tôi hỗ trợ bạn từ khâu đăng bán cho đến khi giao hàng."
                    : "Tìm kiếm những lựa chọn cho thuê linh hoạt và tiện lợi. Chúng tôi giúp bạn dễ dàng tiếp cận các sản phẩm mà bạn cần mà không cần phải mua sắm vội vàng."}
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

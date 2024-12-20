import { HomeIcon, MapPin, Search } from 'lucide-react'
import React from 'react'

const SectionChooseUs = () => {
  return (
   <section className="py-16 ">  
        <div className="max-w-7xl mx-auto px-4">  
          <h2 className="text-3xl font-bold text-center mb-12 text-[#001C43] ">Tại Sao Chọn Chúng Tôi</h2>  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">  
            <div className="text-center">  
              <HomeIcon className="h-12 w-12 mx-auto text-main mb-4" />  
              <h3 className="text-xl font-semibold mb-2 font-roboto">Danh Mục Tài Sản Đa Dạng</h3>  
              <p className="text-gray-600">  
                Khám phá bộ sưu tập tài sản phong phú của chúng tôi để tìm kiếm sự phù hợp hoàn hảo  
              </p>  
            </div>  
            <div className="text-center">  
              <MapPin className="h-12 w-12 mx-auto text-main mb-4" />  
              <h3 className="text-xl font-semibold mb-2 font-roboto">Vị Trí Đắc Địa</h3>  
              <p className="text-gray-600">  
                Các tài sản nằm trong những khu vực và vị trí được ưa chuộng nhất  
              </p>  
            </div>  
            <div className="text-center">  
              <Search className="h-12 w-12 mx-auto text-main mb-4" />  
              <h3 className="text-xl font-semibold mb-2 font-roboto">Hướng Dẫn Chuyên Nghiệp</h3>  
              <p className="text-gray-600">  
                Hỗ trợ chuyên nghiệp trong suốt hành trình tìm kiếm tài sản của bạn  
              </p>  
            </div>  
          </div>  
        </div>  
      </section>
  )
}

export default SectionChooseUs
  import { Button } from '@/components/ui/button'
  import { ChevronLeft, ChevronRight } from 'lucide-react'
  import React, { useState } from 'react'
  import PropTypes from 'prop-types'
  
  const ImagesPropertiesDetail = ({images=[]}) => {
      const [currentImageIndex, setCurrentImageIndex] = useState(0)
      const nextImage = () => {
        if (images.length > 0) {
          setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }
        }
        const previousImage = () => {
          if (images.length > 0) {
            setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
        }
        }
    return (
      <div className="flex-grow pr-6 space-y-2">
          {/* Main Image Carousel */}
          <div className="relative aspect-[4/3] w-full h-[390px] overflow-hidden rounded-lg">
            <img
              src={images[currentImageIndex]}
              alt="Property view"
              className="object-cover  w-full h-[390px]"
            />
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={previousImage}
                className="h-10 w-10 rounded-full bg-white/80 hover:bg-white"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextImage}
                className="h-10 w-10 rounded-full bg-white/80 hover:bg-white"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
            <div className="absolute bottom-4 right-4 bg-black/60 px-2 py-1 text-sm text-white rounded">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
          <div className=' left-1/2 right-1/2 h-[2px] bg-black/60  '> </div>
          {/* Thumbnail Gallery */}
          <div className="flex gap-2 overflow-x-auto pb-4 ">
            {images.map((src, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg ${
                  index === currentImageIndex ? "ring-2 ring-primary" : ""
                }`}
              >
                <img src={src} alt={`Thumbnail ${index + 1}`} className="object-cover w-[80px] h-[80px] bg-red-400" />
              </button>
            ))}
          </div>
          </div>
    )
  }

  export default ImagesPropertiesDetail
  ImagesPropertiesDetail.propTypes={
    images: PropTypes.array
  }
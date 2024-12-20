import { provenPost } from '@/lib/contants';
import { pathnames } from '@/lib/pathname';
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useRef } from 'react'
import { Link } from 'react-router-dom';

const SectionSearchArea = () => {
    const scrollContainerRef = useRef(null)

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  return (
    <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#001C43]">Tìm kiếm theo khu vực</h2>
          <div className="relative">
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {provenPost.map((city) => (
                <div key={city.id} className="flex-none w-[calc(100%/3)] snap-start px-2">
                  <div className="relative overflow-hidden rounded-lg shadow-md group">
                    <div className="w-full h-48 overflow-hidden">
                      <img 
                        src={city.pathUrl} 
                        alt={city.label}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2">
                      <Link className="text-lg font-semibold hover:cursor-pointer 
                      hover:underline" to={`${pathnames.public.rentProperty}?province=${city.label.replace(/ /g, "+")}`}>{city.label}</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => scroll('left')} 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 shadow-md"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button 
              onClick={() => scroll('right')} 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 shadow-md"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </div>
      </section>
  )
}

export default SectionSearchArea
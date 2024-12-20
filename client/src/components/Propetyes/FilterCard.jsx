import { price, size } from '@/lib/contants';
import React, { useState } from 'react';  

const FilterCard = () => {  
    const [selectedPrice, setSelectedPrice] = useState("ALL");  
    const [selectedSize, setSelectedSize] = useState("ALL");  

    // Dữ liệu bất động sản (bạn có thể thay đổi theo thực tế)  
    const properties = [  
        { id: 1, price: 600 * Math.pow(10, 6), size: 40 },  
        { id: 2, price: 1500 * Math.pow(10, 6), size: 70 },  
        { id: 3, price: 800 * Math.pow(10, 6), size: 50 },  
        { id: 4, price: 2000 * Math.pow(10, 6), size: 90 },  
        // Thêm nhiều bất động sản khác  
    ];  

    const filteredProperties = properties.filter(property => {  
        const priceRange = selectedPrice !== "ALL" ? JSON.parse(selectedPrice) : null;  
        const sizeRange = selectedSize !== "ALL" ? JSON.parse(selectedSize) : null;  

        // Kiểm tra điều kiện khoảng giá  
        const inPriceRange = priceRange ?   
            (priceRange[0] === "gte" ? property.price >= priceRange[1] :   
            property.price >= priceRange[0] && property.price <= priceRange[1]) : true;  

        // Kiểm tra điều kiện diện tích  
        const inSizeRange = sizeRange ?   
            (sizeRange[0] === "gte" ? property.size >= sizeRange[1] :   
            property.size >= sizeRange[0] && property.size <= sizeRange[1]) : true;  

        return inPriceRange && inSizeRange;  
    });  

    return (  
        <div className="col-span-3 flex-col gap-4 space-y-4 mt-2 ">  
            <div className="flex-col bg-slate-100  border rounded-sm px-4 pb-2 ">  
                <h3 className="font-normal font-roboto mt-2">Lọc theo khoảng giá</h3>  
                <div>  
                    {price.map(item => (  
                        <div key={item.id} onClick={() => setSelectedPrice(item.value)}>  
                            <span className='text-xs hover:underline hover:text-main'>  
                            ● {item.label}  
                            </span>  
                        </div>  
                    ))}  
                </div>  
            </div>  

            <div className="flex-col bg-slate-100 border rounded-sm border rounded-sm px-4 pb-2">  
                <h3 className="font-normal font-roboto mt-2">Lọc theo diện tích</h3>  
                <div>  
                    {size.map(item => (  
                        <div key={item.id} onClick={() => setSelectedSize(item.value)}>  
                            <span className='text-xs hover:underline hover:text-main' >  
                            ● {item.label}  
                            </span>  
                        </div>  
                    ))}  
                </div>  
            </div>  
        </div>  
    );  
};  
 
export default FilterCard;
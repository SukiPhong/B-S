import React, { useEffect, useState } from 'react';
import { apiDeletePostId, apiGetPrototypes } from '@/apis/post';
import { useSearchParams } from 'react-router-dom';
import useMeStore from '@/zustand/useMeStore';
import useSearchStore from '@/zustand/useSearchStore';
import { PaginationComponent } from '../pagination';
import PropertyCard from './PropertyCard';

const CardPrototypes = ({ setLayout, limit, ListingType }) => {
  console.log(setLayout)
  const { me } = useMeStore();
  const [properties, setProperties] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { setSearch } = useSearchStore();
  const gridCols = me?.rPricing?.priority >= 3 ? "grid-cols-10" : "grid-cols-8";
  useEffect(() => {
    const fetchPrototypes = async (params) => {
      const response = await apiGetPrototypes({
        idUser: setLayout ? me.id : undefined,
        limit,
        ...params,
      });
      
      if (response.data.success) {
        setProperties(response.data.data);
        setIsLoading(true);
      }
    };

    if (searchParams.get("page") > properties?.count) {
      searchParams.set("page", 1);
      setSearchParams(searchParams);
    }

    const params = Object.fromEntries([...searchParams]);
    if (!setLayout) {
      params.status = 'Chờ duyệt,Nháp';
    }
    params.ListingType = ListingType;
    
    const properType = searchParams.get("properType");
    setSearch("properType", properType || "");
    setSearch("rows", properties?.rows.length);
    console.log(params)
    fetchPrototypes(params);
  }, [searchParams]);

  const handleRemove = async (pid) => {
    await apiDeletePostId(pid);
  };

  if (!isLoading) {
    return <div>Loading map...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-10 gap-3 mb-4">
       <div className='col-'>
       {properties?.rows?.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            setLayout={setLayout}
            onRemove={handleRemove}
          />
        ))}
       </div>
      </div>
      {properties?.rows?.length > 0 && (
        <PaginationComponent
          total={properties?.count}
          currentPage={properties?.page}
          limit={properties?.limit}
          params={searchParams.get("page")}
        />
      )}
    </div>
  );
};

export default CardPrototypes;
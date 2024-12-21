/* eslint-disable no-unused-vars */
import React from 'react';
import CardPrototypes from '@/components/Propetyes/CardPrototypes';
import PropertyLayout from '@/components/layouts/PropertyLayout';



const SoldProperty = () => {
 
  return (
    <PropertyLayout title="Bán"   >
        <CardPrototypes
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          limit={import.meta.env.VITE_LIMIT_LIST}
          ListingType="Bán"
          setLayout={false}
        />
    </PropertyLayout>
  );
};

export default SoldProperty;


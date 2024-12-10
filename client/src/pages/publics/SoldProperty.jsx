import React from 'react';
import CardPrototypes from '@/components/Propetyes/CardPrototypes';
import PropertyLayout from '@/components/layouts/PropertyLayout';

const SoldProperty = () => {
  return (
    <PropertyLayout title="Bán">
      <CardPrototypes
        className="h-[190px]"
        limit={import.meta.env.VITE_LIMIT_LIST}
        ListingType="Bán"
        setLayout={false}
      />
    </PropertyLayout>
  );
};

export default SoldProperty;
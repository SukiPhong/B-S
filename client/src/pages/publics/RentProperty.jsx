import { PropertyLayout } from '@/components/layouts';
import { CardPrototypes } from '@/components/Propetyes';
import React from 'react';

const RentProperty = () => {
  return (
    <PropertyLayout title="Cho thuê">
      <CardPrototypes
        className="h-[190px]"
        limit={import.meta.env.VITE_LIMIT_LIST}
        ListingType="Cho thuê"
        setLayout={false}
      />
    </PropertyLayout>
  );
};

export default RentProperty;
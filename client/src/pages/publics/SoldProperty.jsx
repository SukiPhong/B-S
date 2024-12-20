import React, { useState } from 'react';
import CardPrototypes from '@/components/Propetyes/CardPrototypes';
import PropertyLayout from '@/components/layouts/PropertyLayout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { MapPin, X } from 'lucide-react';
import { Map } from '@/components/map';
import useMapStore from '@/zustand/useMapStore';
import { MapComponent } from '@/components/map/MapComponent ';


const SoldProperty = () => {
  const { showMap } = useMapStore();
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


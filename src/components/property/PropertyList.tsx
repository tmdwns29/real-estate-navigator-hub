
import React from 'react';
import PropertyCard from './PropertyCard';

interface Property {
  id: string;
  title: string;
  type: string;
  dealType: string;
  price?: number;
  deposit?: number;
  monthlyRent?: number;
  address: string;
  area: number;
  rooms: number;
  baths: number;
  floor: number;
  totalFloors: number;
  thumbnail: string;
  likes: number;
  predictedPrice?: number | null;
  fraudRisk?: number | null;
}

interface PropertyListProps {
  properties: Property[];
  likedProperties: Set<string>;
  onToggleLike: (id: string) => void;
}

const PropertyList: React.FC<PropertyListProps> = ({ 
  properties, 
  likedProperties, 
  onToggleLike 
}) => {
  if (properties.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto mb-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <p className="text-lg font-medium mb-2">검색 결과가 없습니다</p>
        <p className="text-gray-500 mb-6">다른 검색 조건을 선택해 보세요.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {properties.map(property => (
        <PropertyCard
          key={property.id}
          property={property}
          isLiked={likedProperties.has(property.id)}
          onToggleLike={onToggleLike}
        />
      ))}
    </div>
  );
};

export default PropertyList;

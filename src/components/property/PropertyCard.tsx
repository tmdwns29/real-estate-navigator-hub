
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

interface PropertyCardProps {
  property: Property;
  isLiked: boolean;
  onToggleLike: (id: string) => void;
}

// Format price function
const formatPrice = (price: number) => {
  if (price >= 100000000) {
    return `${Math.floor(price / 100000000)}억 ${price % 100000000 > 0 ? Math.floor((price % 100000000) / 10000) + '만' : ''}원`;
  } else if (price >= 10000) {
    return `${Math.floor(price / 10000)}만원`;
  } else {
    return `${price}원`;
  }
};

const PropertyCard: React.FC<PropertyCardProps> = ({ property, isLiked, onToggleLike }) => {
  return (
    <Card key={property.id} className="overflow-hidden card-hover h-full flex flex-col">
      <div className="relative h-48">
        <img
          src={property.thumbnail}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => onToggleLike(property.id)}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isLiked 
              ? "bg-realestate-highlight text-white" 
              : "bg-white text-gray-400 hover:bg-gray-100"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill={isLiked ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
        <Badge className="absolute bottom-2 left-2 bg-white text-gray-700">
          찜 {property.likes + (isLiked ? 1 : 0)}
        </Badge>
      </div>
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg truncate">{property.title}</CardTitle>
            <CardDescription className="truncate">{property.address}</CardDescription>
          </div>
          <Badge>{property.dealType}</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">가격</span>
            <span className="font-semibold">
              {property.dealType === "월세" 
                ? `${formatPrice(property.deposit || 0)} / ${formatPrice(property.monthlyRent || 0)}`
                : formatPrice(property.price || 0)}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">면적</span>
            <span>{property.area}m² ({Math.floor(property.area / 3.305)}평)</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">구조</span>
            <span>{property.rooms}룸 / {property.baths}욕실</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">층수</span>
            <span>{property.floor}층 / 총 {property.totalFloors}층</span>
          </div>
          
          {/* Show prediction or risk based on deal type */}
          {property.dealType === "매매" && property.predictedPrice && (
            <div className="mt-4 p-2 bg-blue-50 rounded-md">
              <div className="flex justify-between">
                <span className="text-blue-800">예상 미래 시세</span>
                <span className="font-semibold text-blue-800">{formatPrice(property.predictedPrice)}</span>
              </div>
            </div>
          )}
          
          {(property.dealType === "전세" || property.dealType === "월세") && property.fraudRisk !== null && (
            <div className={`mt-4 p-2 rounded-md ${
              property.fraudRisk === 0 ? "bg-green-50" :
              property.fraudRisk === 1 ? "bg-yellow-50" :
              property.fraudRisk === 2 ? "bg-orange-50" : "bg-red-50"
            }`}>
              <div className="flex justify-between">
                <span className={`${
                  property.fraudRisk === 0 ? "text-green-800" :
                  property.fraudRisk === 1 ? "text-yellow-800" :
                  property.fraudRisk === 2 ? "text-orange-800" : "text-red-800"
                }`}>
                  전세사기 위험도
                </span>
                <div className="flex">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${
                        i < (property.fraudRisk || 0) 
                          ? property.fraudRisk === 0 ? "text-green-500" :
                            property.fraudRisk === 1 ? "text-yellow-500" :
                            property.fraudRisk === 2 ? "text-orange-500" : "text-red-500"
                          : "text-gray-300"
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between mt-auto">
        <Button variant="ghost">상세보기</Button>
        <Button variant="outline">연락하기</Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;


import React, { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';

interface Property {
  id: string;
  address: string;
  price?: number;
  deposit?: number;
  monthlyRent?: number;
  dealType: string;
  // Add any other properties you need
}

interface MapViewProps {
  properties: Property[];
  selectedCity: string;
  selectedDistrict: string;
  dealType: string;
}

// Helper function to get appropriate center coordinates based on location
const getCenterCoordinates = (city: string, district: string) => {
  // Default to Seoul
  let center = { lat: 37.5665, lng: 126.9780 };
  
  // These are rough estimates - in a real app you would use geocoding
  if (city === "서울특별시") {
    if (district === "강남구") center = { lat: 37.4959854, lng: 127.0664091 };
    else if (district === "마포구") center = { lat: 37.5665, lng: 126.9018 };
    // Add more districts as needed
  } else if (city === "인천광역시") {
    center = { lat: 37.4563, lng: 126.7052 };
  } else if (city === "부산광역시") {
    center = { lat: 35.1796, lng: 129.0756 };
  } else if (city === "경기도") {
    center = { lat: 37.2911, lng: 127.0089 };
  }
  
  return center;
}

const MapView: React.FC<MapViewProps> = ({ 
  properties, 
  selectedCity, 
  selectedDistrict,
  dealType
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  
  useEffect(() => {
    // Check if Google Maps API is already loaded
    if (!window.google?.maps) {
      // If not loaded, create script and append to body
      const googleMapScript = document.createElement('script');
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
      googleMapScript.async = true;
      googleMapScript.defer = true;
      window.document.body.appendChild(googleMapScript);
      
      googleMapScript.addEventListener('load', () => {
        setMapLoaded(true);
      });
      
      return () => {
        window.document.body.removeChild(googleMapScript);
      };
    } else {
      setMapLoaded(true);
    }
  }, []);
  
  // Initialize the map once the API is loaded
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;
    
    const center = getCenterCoordinates(selectedCity, selectedDistrict);
    
    const mapOptions: google.maps.MapOptions = {
      center,
      zoom: selectedDistrict ? 14 : selectedCity ? 12 : 7,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
    };
    
    const newMap = new google.maps.Map(mapRef.current, mapOptions);
    setMap(newMap);
    
    // Clean up
    return () => {
      setMap(null);
    };
  }, [mapLoaded, selectedCity, selectedDistrict]);
  
  // Add markers for properties when map and properties change
  useEffect(() => {
    if (!map || !properties.length) return;
    
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    
    // Create new markers
    const newMarkers = properties.map(property => {
      // In a real app, you would use geocoding or have exact coordinates
      // This is a simulation - we're placing markers around the center with slight offsets
      const center = map.getCenter();
      if (!center) return null;
      
      // Generate a somewhat random position within visible map bounds
      const lat = center.lat() + (Math.random() - 0.5) * 0.05;
      const lng = center.lng() + (Math.random() - 0.5) * 0.05;
      
      const marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: property.address,
        animation: google.maps.Animation.DROP
      });
      
      // Create info window for this property
      const price = property.dealType === "월세" 
        ? `보증금: ${property.deposit ? (property.deposit / 10000) + '만원' : 'N/A'} / 월세: ${property.monthlyRent ? (property.monthlyRent / 10000) + '만원' : 'N/A'}`
        : `${property.price ? (property.price / 100000000) + '억원' : 'N/A'}`;
        
      const contentString = `
        <div style="width: 200px; padding: 10px;">
          <h3 style="margin: 0 0 5px; font-weight: bold;">${property.address}</h3>
          <p style="margin: 0 0 5px;">${property.dealType} | ${price}</p>
          <a href="#property-${property.id}" style="color: blue; text-decoration: underline;">상세 보기</a>
        </div>
      `;
      
      const infoWindow = new google.maps.InfoWindow({
        content: contentString,
      });
      
      marker.addListener("click", () => {
        infoWindow.open({
          anchor: marker,
          map,
        });
      });
      
      return marker;
    }).filter(Boolean) as google.maps.Marker[];
    
    setMarkers(newMarkers);
    
    // Clean up
    return () => {
      newMarkers.forEach(marker => marker.setMap(null));
    };
  }, [map, properties]);
  
  return (
    <div className="relative w-full h-full flex flex-col">
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Spinner className="w-8 h-8 text-realestate-primary" />
          <span className="ml-2">지도 로딩 중...</span>
        </div>
      )}
      
      <div ref={mapRef} className="flex-grow w-full" style={{ minHeight: "600px" }} />
      
      <div className="absolute bottom-4 left-4 z-10 bg-white p-3 rounded-lg shadow-md">
        <div className="text-sm font-medium mb-2">
          {selectedCity || "전체"} 
          {selectedDistrict ? ` ${selectedDistrict}` : ""} 
          지역의 {dealType} 매물 현황
        </div>
        <div className="flex gap-2">
          <Badge className="bg-realestate-primary">총 {properties.length}개 매물</Badge>
          <Badge variant="outline" className="border-realestate-primary text-realestate-primary">
            평균가 {dealType === "매매" ? "9억 8천만원" : "2억 5천만원"}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default MapView;

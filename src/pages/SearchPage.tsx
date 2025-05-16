
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import MapView from "@/components/property/MapView";
import SearchFilters from "@/components/property/SearchFilters";
import InfoCard from "@/components/property/InfoCard";
import PropertyList from "@/components/property/PropertyList";
import { mockListings, mockCities, mockDistricts, Property } from "@/data/propertyData";

const SearchPage = () => {
  const { toast } = useToast();
  const [dealType, setDealType] = useState<string>("매매");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [properties, setProperties] = useState<Property[]>(mockListings);
  const [likedProperties, setLikedProperties] = useState<Set<string>>(new Set());
  const [showMap, setShowMap] = useState<boolean>(true);
  const [mapViewMode, setMapViewMode] = useState<"split" | "fullscreen">("split");
  
  // Filter properties based on deal type and location
  const filteredProperties = dealType
    ? properties.filter(property => 
        property.dealType === dealType && 
        (selectedCity ? property.address.includes(selectedCity) : true) && 
        (selectedDistrict ? property.address.includes(selectedDistrict) : true)
      )
    : properties;

  const handleToggleLike = (id: string) => {
    setLikedProperties(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(id)) {
        newLiked.delete(id);
        toast({
          description: "관심 매물에서 삭제되었습니다.",
        });
      } else {
        newLiked.add(id);
        toast({
          description: "관심 매물로 등록되었습니다.",
        });
      }
      return newLiked;
    });
  };

  const toggleMapViewMode = () => {
    setMapViewMode(prev => prev === "split" ? "fullscreen" : "split");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">지역별 매물 검색</h1>
        
        {/* Search Filters */}
        <SearchFilters 
          dealType={dealType}
          setDealType={setDealType}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
          showMap={showMap}
          setShowMap={setShowMap}
          mapViewMode={mapViewMode}
          toggleMapViewMode={toggleMapViewMode}
          cities={mockCities}
          districts={mockDistricts}
        />

        {/* Google Maps Integration */}
        {showMap && (
          <div className={`mb-8 ${mapViewMode === "fullscreen" ? "h-[800px]" : "h-[600px]"}`}>
            <MapView 
              properties={filteredProperties} 
              selectedCity={selectedCity} 
              selectedDistrict={selectedDistrict}
              dealType={dealType}
            />
          </div>
        )}

        {/* Additional Information Card */}
        {(mapViewMode !== "fullscreen" || !showMap) && (
          <InfoCard dealType={dealType} />
        )}
        
        {/* Property Listings */}
        {(mapViewMode !== "fullscreen" || !showMap) && (
          <PropertyList 
            properties={filteredProperties}
            likedProperties={likedProperties}
            onToggleLike={handleToggleLike}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;

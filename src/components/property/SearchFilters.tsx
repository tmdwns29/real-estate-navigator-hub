
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";

interface SearchFiltersProps {
  dealType: string;
  setDealType: (type: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  showMap: boolean;
  setShowMap: (show: boolean) => void;
  mapViewMode: "split" | "fullscreen";
  toggleMapViewMode: () => void;
  cities: string[];
  districts: Record<string, string[]>;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  dealType,
  setDealType,
  selectedCity,
  setSelectedCity,
  selectedDistrict,
  setSelectedDistrict,
  showMap,
  setShowMap,
  mapViewMode,
  toggleMapViewMode,
  cities,
  districts
}) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>검색 옵션</CardTitle>
        <CardDescription>원하는 조건을 선택하여 매물을 검색하세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="deal-type" className="mb-2 block">거래 유형</Label>
            <Tabs defaultValue={dealType} className="w-full" onValueChange={setDealType}>
              <TabsList className="w-full">
                <TabsTrigger value="매매" className="flex-1">매매</TabsTrigger>
                <TabsTrigger value="전세" className="flex-1">전세</TabsTrigger>
                <TabsTrigger value="월세" className="flex-1">월세</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div>
            <Label htmlFor="city" className="mb-2 block">시/도</Label>
            <Select onValueChange={setSelectedCity} value={selectedCity}>
              <SelectTrigger id="city">
                <SelectValue placeholder="시/도 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>시/도</SelectLabel>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="district" className="mb-2 block">군/구</Label>
            <Select 
              onValueChange={setSelectedDistrict} 
              value={selectedDistrict}
              disabled={!selectedCity || !districts[selectedCity]}
            >
              <SelectTrigger id="district">
                <SelectValue placeholder="군/구 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>군/구</SelectLabel>
                  {selectedCity && districts[selectedCity]?.map(district => (
                    <SelectItem key={district} value={district}>{district}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => setShowMap(prev => !prev)}
        >
          <MapPin className="h-4 w-4" />
          {showMap ? "지도 숨기기" : "지도 보기"}
        </Button>
        
        {showMap && (
          <Button 
            variant="outline"
            onClick={toggleMapViewMode}
          >
            {mapViewMode === "split" ? "지도 확대" : "지도 축소"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SearchFilters;

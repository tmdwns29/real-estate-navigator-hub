import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { MapPin } from "lucide-react";
import MapView from "@/components/property/MapView";
import PropertyCard from "@/components/property/PropertyCard";

// Mock property listings data
const mockListings = [
  {
    id: "1",
    title: "강남 신축 아파트",
    type: "아파트",
    dealType: "매매",
    price: 980000000,
    address: "서울특별시 강남구 테헤란로 123",
    area: 84.12,
    rooms: 3,
    baths: 2,
    floor: 12,
    totalFloors: 20,
    thumbnail: "https://via.placeholder.com/600x400?text=Property+Image",
    likes: 24,
    predictedPrice: 1050000000,
    fraudRisk: null,
  },
  {
    id: "2",
    title: "신촌역 인근 오피스텔",
    type: "오피스텔",
    dealType: "전세",
    price: 350000000,
    address: "서울특별시 마포구 신촌로 45",
    area: 42.31,
    rooms: 1,
    baths: 1,
    floor: 8,
    totalFloors: 15,
    thumbnail: "https://via.placeholder.com/600x400?text=Property+Image",
    likes: 15,
    predictedPrice: null,
    fraudRisk: 2,
  },
  {
    id: "3",
    title: "한강뷰 고급 아파트",
    type: "아파트",
    dealType: "매매",
    price: 1250000000,
    address: "서울특별시 용산구 이촌로 78",
    area: 109.56,
    rooms: 4,
    baths: 2,
    floor: 18,
    totalFloors: 25,
    thumbnail: "https://via.placeholder.com/600x400?text=Property+Image",
    likes: 36,
    predictedPrice: 1320000000,
    fraudRisk: null,
  },
  {
    id: "4",
    title: "역세권 투룸",
    type: "빌라",
    dealType: "월세",
    deposit: 30000000,
    monthlyRent: 800000,
    address: "서울특별시 송파구 오금로 234",
    area: 49.58,
    rooms: 2,
    baths: 1,
    floor: 3,
    totalFloors: 5,
    thumbnail: "https://via.placeholder.com/600x400?text=Property+Image",
    likes: 12,
    predictedPrice: null,
    fraudRisk: 0,
  },
  {
    id: "5",
    title: "인천 신도시 아파트",
    type: "아파트",
    dealType: "매매",
    price: 520000000,
    address: "인천광역시 연수구 센트럴로 567",
    area: 76.33,
    rooms: 3,
    baths: 2,
    floor: 10,
    totalFloors: 20,
    thumbnail: "https://via.placeholder.com/600x400?text=Property+Image",
    likes: 18,
    predictedPrice: 550000000,
    fraudRisk: null,
  },
  {
    id: "6",
    title: "경기도 신축 단독주택",
    type: "단독주택",
    dealType: "매매",
    price: 720000000,
    address: "경기도 고양시 일산동구 무궁화로 89",
    area: 132.23,
    rooms: 4,
    baths: 2,
    floor: 2,
    totalFloors: 2,
    thumbnail: "https://via.placeholder.com/600x400?text=Property+Image",
    likes: 29,
    predictedPrice: 750000000,
    fraudRisk: null,
  }
];

// Mock city and district data
const mockCities = ["서울특별시", "경기도", "인천광역시", "부산광역시", "대구광역시", "광주광역시", "대전광역시", "울산광역시"];
const mockDistricts: Record<string, string[]> = {
  "서울특별시": ["강남구", "서초구", "송파구", "강동구", "마포구", "용산구", "종로구", "중구", "성동구", "광진구", "동대문구", "성북구", "강북구", "도봉구", "노원구", "중랑구", "서대문구", "���평구", "강서구", "양천구", "구로구", "금천구", "영등포구", "동작구", "관악구"],
  "경기도": ["수원시", "성남시", "안양시", "안산시", "용인시", "부천시", "광명시", "평택시", "과천시", "오산시", "시흥시", "군포시", "의왕시", "하남시", "이천시", "안성시", "김포시", "화성시", "광주시", "여주시", "양평군", "고양시", "의정부시", "동두천시", "구리시", "남양주시", "파주시", "양주시", "포천시", "연천군", "가평군"],
  "인천광역시": ["중구", "동구", "남구", "연수구", "남동구", "부평구", "계양구", "서구", "강화군", "옹진군"],
  "부산광역시": ["중구", "서구", "동구", "영도구", "부산진구", "동래구", "남구", "북구", "해운대구", "사하구", "금정구", "강서구", "연제구", "수영구", "사상구", "기장군"],
};

const formatPrice = (price: number) => {
  if (price >= 100000000) {
    return `${Math.floor(price / 100000000)}억 ${price % 100000000 > 0 ? Math.floor((price % 100000000) / 10000) + '만' : ''}원`;
  } else if (price >= 10000) {
    return `${Math.floor(price / 10000)}만원`;
  } else {
    return `${price}원`;
  }
};

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
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>검색 옵션</CardTitle>
            <CardDescription>원하는 조건을 선택하여 매물을 검색하세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="deal-type" className="mb-2 block">거래 유형</Label>
                <Tabs defaultValue="매매" className="w-full" onValueChange={setDealType}>
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
                      {mockCities.map(city => (
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
                  disabled={!selectedCity || !mockDistricts[selectedCity]}
                >
                  <SelectTrigger id="district">
                    <SelectValue placeholder="군/구 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>군/구</SelectLabel>
                      {selectedCity && mockDistricts[selectedCity]?.map(district => (
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
          <Card className="mb-8 bg-blue-50 border-blue-100">
            <CardContent className="pt-6">
              {dealType === "매매" ? (
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-800">미래 실거래가 예측 정보</h3>
                    <p className="text-blue-600 text-sm">각 매물에 대한 예상 실거래가를 확인하실 수 있습니다.</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="bg-red-100 rounded-full p-3 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-red-800">전세사기 위험도 정보</h3>
                    <p className="text-red-600 text-sm">각 매물에 대한 전세사기 위험도를 확인하실 수 있습니다. (0: 안전, 3: 매우 위험)</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
        
        {/* Property Listings */}
        {(mapViewMode !== "fullscreen" || !showMap) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredProperties.length > 0 ? (
              filteredProperties.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isLiked={likedProperties.has(property.id)}
                  onToggleLike={handleToggleLike}
                />
              ))
            ) : (
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

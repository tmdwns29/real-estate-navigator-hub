
// Mock property listings data
export const mockListings = [
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
export const mockCities = ["서울특별시", "경기도", "인천광역시", "부산광역시", "대구광역시", "광주광역시", "대전광역시", "울산광역시"];
export const mockDistricts: Record<string, string[]> = {
  "서울특별시": ["강남구", "서초구", "송파구", "강동구", "마포구", "용산구", "종로구", "중구", "성동구", "광진구", "동대문구", "성북구", "강북구", "도봉구", "노원구", "중랑구", "서대문구", "���평구", "강서구", "양천구", "구로구", "금천구", "영등포구", "동작구", "관악구"],
  "경기도": ["수원시", "성남시", "안양시", "안산시", "용인시", "부천시", "광명시", "평택시", "과천시", "오산시", "시흥시", "군포시", "의왕시", "하남시", "이천시", "안성시", "김포시", "화성시", "광주시", "여주시", "양평군", "고양시", "의정부시", "동두천시", "구리시", "남양주시", "파주시", "양주시", "포천시", "연천군", "가평군"],
  "인천광역시": ["중구", "동구", "남구", "연수구", "남동구", "부평구", "계양구", "서구", "강화군", "옹진군"],
  "부산광역시": ["중구", "서구", "동구", "영도구", "부산진구", "동래구", "남구", "북구", "해운대구", "사하구", "금정구", "강서구", "연제구", "수영구", "사상구", "기장군"],
};

export interface Property {
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


import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// Mock real estate news data
const mockNews = [
  {
    id: 1,
    title: "정부, '청년·신혼부부 주택 30만호 공급 계획' 발표",
    source: "부동산 경제",
    date: "2025-05-16",
    category: "정책",
    summary: "정부는 내년까지 청년과 신혼부부를 위한 공공임대주택 30만호를 공급할 계획이라고 밝혔습니다. 신혼부부와 청년들의 주거 안정을 위한 이번 정책은..."
  },
  {
    id: 2,
    title: "서울 아파트 가격 3개월 연속 상승세",
    source: "부동산 뉴스",
    date: "2025-05-15",
    category: "시장동향",
    summary: "서울 지역 아파트 가격이 지난 3개월간 꾸준히 상승했습니다. 특히 강남구와 서초구의 아파트 가격은 전월 대비 1.5% 상승했으며..."
  },
  {
    id: 3,
    title: "전세사기 예방을 위한 5가지 필수 확인사항",
    source: "부동산 가이드",
    date: "2025-05-14",
    category: "가이드",
    summary: "최근 증가하는 전세사기 피해를 예방하기 위해 계약 전 확인해야 할 5가지 필수 사항을 소개합니다. 등기부등본 확인부터 계약금 지급 방법까지..."
  },
  {
    id: 4,
    title: "부동산 중개수수료 개편안 시행",
    source: "부동산 타임즈",
    date: "2025-05-13",
    category: "정책",
    summary: "이번 달부터 시행되는 부동산 중개수수료 개편안에 따라 주택 매매 시 최대 수수료율이 조정됩니다. 개정된 수수료 체계는 주택 가격에 따라 차등 적용되며..."
  },
  {
    id: 5,
    title: "2025년 부동산 시장 전망 '긍정적'",
    source: "경제 리포트",
    date: "2025-05-12",
    category: "시장동향",
    summary: "전문가들은 금리 인하와 규제 완화로 인해 2025년 부동산 시장이 점진적으로 회복될 것으로 전망했습니다. 특히 수도권 외곽 지역과 교통망이 개선되는 지역의 가치가 상승할 것으로 예측되며..."
  }
];

// Category badge color mapping
const categoryColors: Record<string, string> = {
  "정책": "bg-blue-100 text-blue-800",
  "시장동향": "bg-green-100 text-green-800",
  "가이드": "bg-amber-100 text-amber-800"
};

const NewsSection = () => {
  const [news, setNews] = useState<typeof mockNews>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with a delay
    const fetchNews = async () => {
      setLoading(true);
      // In a real application, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNews(mockNews);
      setLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">부동산 뉴스</h2>
          <span className="text-sm text-realestate-primary">실시간 업데이트</span>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="h-64">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/3" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-4 w-1/4" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <Card key={item.id} className="card-hover">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription className="mt-2">{item.source} • {item.date}</CardDescription>
                    </div>
                    <Badge variant="outline" className={categoryColors[item.category] || ""}>
                      {item.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-3">{item.summary}</p>
                </CardContent>
                <CardFooter>
                  <button className="text-sm text-realestate-primary hover:underline">
                    자세히 보기
                  </button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;

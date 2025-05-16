
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NewsSection from "@/components/home/NewsSection";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-realestate-accent to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              최적의 주거 공간을 찾는 여정을 시작하세요
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              믿을 수 있는 정보와 함께 당신에게 맞는 집을 찾아보세요.
              실시간 시세와 전세사기 위험도 확인, 그리고 다양한 매물 정보를 제공합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/search">
                <Button size="lg" className="bg-realestate-primary hover:bg-realestate-secondary">
                  지역별 매물 검색 시작하기
                </Button>
              </Link>
              <Link to="/reviews">
                <Button size="lg" variant="outline">
                  후기 게시판 둘러보기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">믿을 수 있는 부동산 정보 서비스</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg shadow-sm border border-gray-100 bg-white">
              <div className="bg-realestate-accent w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-realestate-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">정확한 매물 정보</h3>
              <p className="text-gray-600">
                검증된 매물 정보와 함께 매매, 전세, 월세 등 다양한 거래 유형별 검색 서비스를 제공합니다.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg shadow-sm border border-gray-100 bg-white">
              <div className="bg-realestate-accent w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-realestate-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">시세 예측 및 분석</h3>
              <p className="text-gray-600">
                미래 시세 예측 정보와 함께 지역별 가격 동향을 분석하여 투자 및 거주 결정에 도움을 드립니다.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg shadow-sm border border-gray-100 bg-white">
              <div className="bg-realestate-accent w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-realestate-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">안전한 거래 정보</h3>
              <p className="text-gray-600">
                전세사기 피해 정보와 위험 지역 알림을 통해 안전한 부동산 거래를 도와드립니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Real Estate News Section */}
      <NewsSection />

      {/* CTA Section */}
      <section className="py-16 bg-realestate-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">지금 바로 시작하세요</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            회원가입하고 더 많은 부동산 정보와 맞춤 서비스를 이용해보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="bg-white text-realestate-primary hover:bg-gray-100">
                무료 회원가입
              </Button>
            </Link>
            <Link to="/search">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-realestate-primary">
                매물 둘러보기
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

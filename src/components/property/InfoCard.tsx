
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface InfoCardProps {
  dealType: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ dealType }) => {
  return (
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
  );
};

export default InfoCard;

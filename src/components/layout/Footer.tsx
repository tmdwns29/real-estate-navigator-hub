
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">부동산 정보 플랫폼</h3>
            <p className="text-gray-600">신뢰할 수 있는 부동산 정보와 서비스를 제공합니다.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">서비스</h3>
            <ul className="space-y-2">
              <li><Link to="/search" className="text-gray-600 hover:text-realestate-primary">지역별 매물 검색</Link></li>
              <li><Link to="/reviews" className="text-gray-600 hover:text-realestate-primary">후기 게시판</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">회원</h3>
            <ul className="space-y-2">
              <li><Link to="/signup" className="text-gray-600 hover:text-realestate-primary">회원 가입</Link></li>
              <li><Link to="/mypage" className="text-gray-600 hover:text-realestate-primary">마이페이지</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">고객센터</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">이메일: support@realestate.com</li>
              <li className="text-gray-600">전화: 02-123-4567</li>
              <li className="text-gray-600">운영시간: 평일 09:00 - 18:00</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} 부동산 정보 플랫폼. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

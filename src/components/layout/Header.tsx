
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Search, MessageSquare, LogIn, UserPlus, LogOut, User } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const { isAuthenticated, login, logout } = useAuth();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [showResetOption, setShowResetOption] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(loginForm.username, loginForm.password);
    
    if (success) {
      setIsLoginDialogOpen(false);
      toast({
        title: "로그인 성공",
        description: "환영합니다!",
      });
    } else {
      toast({
        title: "로그인 실패",
        description: "아이디 또는 비밀번호가 일치하지 않습니다.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "로그아웃 되었습니다",
      description: "다음에 또 만나요!",
    });
  };

  const resetPassword = () => {
    toast({
      title: "비밀번호 재설정",
      description: "등록된 이메일로 재설정 링크가 발송되었습니다.",
    });
    setShowResetOption(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/" className="text-2xl font-bold text-realestate-primary">
            부동산 정보 플랫폼
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="flex items-center space-x-1">
          <Link 
            to="/search" 
            className={`nav-link flex items-center ${location.pathname === "/search" ? "nav-link-active" : ""}`}
          >
            <Search className="mr-1 h-4 w-4" />
            지역별 매물 검색
          </Link>
          <Link 
            to="/reviews" 
            className={`nav-link flex items-center ${location.pathname === "/reviews" ? "nav-link-active" : ""}`}
          >
            <MessageSquare className="mr-1 h-4 w-4" />
            후기 게시판
          </Link>

          {/* Authenticated vs Non-Authenticated Navigation */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-1">
              <Link 
                to="/mypage" 
                className={`nav-link flex items-center ${location.pathname === "/mypage" ? "nav-link-active" : ""}`}
              >
                <User className="mr-1 h-4 w-4" />
                마이페이지
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="flex items-center"
              >
                <LogOut className="mr-1 h-4 w-4" />
                로그아웃
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-1">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsLoginDialogOpen(true)}
                className="flex items-center"
              >
                <LogIn className="mr-1 h-4 w-4" />
                로그인
              </Button>
              <Link to="/signup">
                <Button 
                  variant="default" 
                  size="sm"
                  className="flex items-center"
                >
                  <UserPlus className="mr-1 h-4 w-4" />
                  회원가입
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>

      {/* Login Dialog */}
      <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>로그인</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">아이디</Label>
              <Input
                id="username"
                value={loginForm.username}
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                required
              />
            </div>
            
            {showResetOption ? (
              <div className="pt-2">
                <Label htmlFor="resetEmail">비밀번호를 잊으셨나요?</Label>
                <Input
                  id="resetEmail"
                  type="email"
                  placeholder="이메일 주소를 입력하세요"
                  className="mt-1"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  className="mt-2 w-full"
                  onClick={resetPassword}
                >
                  비밀번호 재설정 메일 보내기
                </Button>
              </div>
            ) : (
              <Button 
                type="button" 
                variant="link" 
                className="p-0 h-auto text-sm text-realestate-primary"
                onClick={() => setShowResetOption(true)}
              >
                비밀번호 찾기
              </Button>
            )}
            
            <div className="flex justify-end">
              <Button type="submit">로그인</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;

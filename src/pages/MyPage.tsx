
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { UserCog, UserMinus } from "lucide-react";

const MyPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUser, deleteAccount } = useAuth();
  const { toast } = useToast();
  
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    birthDate: "",
    profileImage: "",
  });
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      toast({
        title: "접근 제한",
        description: "로그인이 필요한 페이지입니다.",
        variant: "destructive",
      });
    }
  }, [isAuthenticated, navigate, toast]);

  // Load user data into form
  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name,
        email: user.email,
        birthDate: user.birthDate,
        profileImage: user.profileImage || "",
      });
    }
  }, [user]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a server
      const imageUrl = URL.createObjectURL(file);
      setProfileForm({
        ...profileForm,
        profileImage: imageUrl,
      });
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const success = await updateUser(profileForm);
      
      if (success) {
        toast({
          title: "프로필 업데이트 완료",
          description: "회원 정보가 성공적으로 업데이트되었습니다.",
        });
      } else {
        toast({
          title: "업데이트 실패",
          description: "회원 정보 업데이트에 실패했습니다. 다시 시도해주세요.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "업데이트 실패",
        description: "오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const success = await deleteAccount();
      
      if (success) {
        setIsDeleteDialogOpen(false);
        navigate("/");
        toast({
          title: "계정 삭제 완료",
          description: "회원 탈퇴가 완료되었습니다. 그동안 이용해주셔서 감사합니다.",
        });
      } else {
        toast({
          title: "계정 삭제 실패",
          description: "회원 탈퇴 중 문제가 발생했습니다. 다시 시도해주세요.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "계정 삭제 실패",
        description: "오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    }
  };

  // If not authenticated and still on this page somehow
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">마이페이지</h1>
        
        <Tabs defaultValue="profile">
          <TabsList className="mb-8">
            <TabsTrigger value="profile">회원 정보</TabsTrigger>
            <TabsTrigger value="favorites">찜한 매물</TabsTrigger>
            <TabsTrigger value="reviews">내가 작성한 후기</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Profile Info Card */}
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-100">
                    {profileForm.profileImage ? (
                      <img
                        src={profileForm.profileImage}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-16 w-16"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.username}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-4">
                    <Label htmlFor="profile-upload" className="cursor-pointer inline-block bg-realestate-primary text-white px-4 py-2 rounded-md hover:bg-realestate-secondary transition-colors">
                      프로필 사진 변경
                    </Label>
                    <Input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">가입일: 2025년 5월 10일</p>
                </CardContent>
              </Card>
              
              {/* Edit Profile Card */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserCog className="mr-2 h-5 w-5" />
                    회원 정보 수정
                  </CardTitle>
                  <CardDescription>
                    회원 정보를 확인하고 수정할 수 있습니다.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">이름</Label>
                      <Input
                        id="name"
                        name="name"
                        value={profileForm.name}
                        onChange={handleProfileChange}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">이메일</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="birthDate">생년월일</Label>
                      <Input
                        id="birthDate"
                        name="birthDate"
                        type="date"
                        value={profileForm.birthDate}
                        onChange={handleProfileChange}
                      />
                    </div>
                    
                    <div className="pt-4 flex justify-between">
                      <Button 
                        variant="outline" 
                        type="button" 
                        className="text-destructive hover:text-destructive flex items-center"
                        onClick={() => setIsDeleteDialogOpen(true)}
                      >
                        <UserMinus className="mr-2 h-4 w-4" />
                        회원 탈퇴
                      </Button>
                      <Button type="button" onClick={handleUpdateProfile}>
                        정보 수정하기
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle>찜한 매물</CardTitle>
                <CardDescription>
                  내가 관심 있게 본 매물 목록입니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <p className="text-lg font-medium mb-2">아직 찜한 매물이 없습니다.</p>
                  <p className="mb-6">마음에 드는 매물을 찾아 찜 해보세요!</p>
                  <Button variant="outline" onClick={() => navigate("/search")}>
                    매물 검색하러 가기
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>내가 작성한 후기</CardTitle>
                <CardDescription>
                  내가 작성한 후기 목록입니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
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
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  <p className="text-lg font-medium mb-2">아직 작성한 후기가 없습니다.</p>
                  <p className="mb-6">경험을 공유하고 다른 사람들에게 도움을 주세요!</p>
                  <Button variant="outline" onClick={() => navigate("/reviews")}>
                    후기 게시판으로 가기
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Delete Account Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>정말 탈퇴하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              회원 탈퇴 시 모든 정보가 삭제되며 복구할 수 없습니다.
              이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive text-destructive-foreground">
              회원 탈퇴
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyPage;


import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

// Mock review data
const initialReviews = [
  {
    id: "1",
    title: "신축 아파트 거주 후기",
    content: "작년에 입주한 아파트인데, 전체적으로 만족스러워요. 특히 단지 내 조경이 잘 되어 있고, 주차 공간도 넉넉합니다. 다만 일부 벽에 균열이 있어서 AS 요청한 상태입니다.",
    author: "홍길동",
    authorId: "user1",
    profileImage: "https://i.pravatar.cc/150?img=1",
    location: "서울특별시 강동구",
    propertyType: "아파트",
    dealType: "매매",
    rating: 4,
    likes: 15,
    comments: 3,
    date: "2025-04-28",
  },
  {
    id: "2",
    title: "전세 사기 의심 사례 공유",
    content: "계약 전에 등기부등본을 꼼꼼히 확인하지 않아 큰 낭패를 볼 뻔했습니다. 이 지역에서 비슷한 사례가 여럿 있다고 합니다. 전세 계약 시 꼭 확인하셔야 할 사항들을 정리해봤습니다.",
    author: "김철수",
    authorId: "user2",
    profileImage: "https://i.pravatar.cc/150?img=2",
    location: "경기도 부천시",
    propertyType: "빌라",
    dealType: "전세",
    rating: 2,
    likes: 42,
    comments: 12,
    date: "2025-05-10",
  },
  {
    id: "3",
    title: "오래된 주택 리모델링 경험",
    content: "20년된 주택을 구입해서 리모델링했습니다. 예상보다 비용이 많이 들었지만, 결과적으로 만족스러운 공간을 얻었어요. 시공업체 선정부터 마감까지 전 과정에 대한 팁을 공유합니다.",
    author: "이영희",
    authorId: "user3",
    profileImage: "https://i.pravatar.cc/150?img=3",
    location: "부산광역시 해운대구",
    propertyType: "단독주택",
    dealType: "매매",
    rating: 5,
    likes: 28,
    comments: 7,
    date: "2025-05-05",
  }
];

// Utility function to get rating stars
const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

interface ReviewFormData {
  title: string;
  content: string;
  location: string;
  propertyType: string;
  dealType: string;
  rating: number;
}

interface Review {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  profileImage: string | undefined;
  location: string;
  propertyType: string;
  dealType: string;
  rating: number;
  likes: number;
  comments: number;
  date: string;
}

const ReviewsPage = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isNewReviewDialogOpen, setIsNewReviewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [reviewToEdit, setReviewToEdit] = useState<Review | null>(null);
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [newReviewForm, setNewReviewForm] = useState<ReviewFormData>({
    title: "",
    content: "",
    location: "",
    propertyType: "",
    dealType: "",
    rating: 5,
  });
  
  // Filtered reviews based on search
  const filteredReviews = searchQuery
    ? reviews.filter(
        review =>
          review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : reviews;
  
  const handleOpenNewReviewDialog = () => {
    if (!isAuthenticated) {
      toast({
        title: "로그인 필요",
        description: "후기를 작성하려면 로그인이 필요합니다.",
        variant: "destructive",
      });
      return;
    }
    
    setIsNewReviewDialogOpen(true);
  };
  
  const handleCreateReview = () => {
    // Validate form
    if (!newReviewForm.title || !newReviewForm.content || !newReviewForm.location || !newReviewForm.propertyType || !newReviewForm.dealType) {
      toast({
        title: "입력 오류",
        description: "모든 필수 항목을 입력해주세요.",
        variant: "destructive",
      });
      return;
    }
    
    if (reviewToEdit) {
      // Update existing review
      const updatedReviews = reviews.map(review =>
        review.id === reviewToEdit.id
          ? {
              ...review,
              title: newReviewForm.title,
              content: newReviewForm.content,
              location: newReviewForm.location,
              propertyType: newReviewForm.propertyType,
              dealType: newReviewForm.dealType,
              rating: newReviewForm.rating,
            }
          : review
      );
      setReviews(updatedReviews);
      setIsEditDialogOpen(false);
      toast({
        description: "후기가 수정되었습니다.",
      });
    } else {
      // Create new review
      const newReview: Review = {
        id: `review-${Date.now()}`,
        ...newReviewForm,
        author: user?.name || "알 수 없음",
        authorId: user?.id || "",
        profileImage: user?.profileImage,
        likes: 0,
        comments: 0,
        date: new Date().toISOString().split("T")[0],
      };
      
      setReviews([newReview, ...reviews]);
      setIsNewReviewDialogOpen(false);
      toast({
        description: "새 후기가 등록되었습니다.",
      });
    }
    
    // Reset form
    setNewReviewForm({
      title: "",
      content: "",
      location: "",
      propertyType: "",
      dealType: "",
      rating: 5,
    });
    setReviewToEdit(null);
  };
  
  const handleEditReview = (review: Review) => {
    if (!isAuthenticated || user?.id !== review.authorId) {
      toast({
        title: "권한 없음",
        description: "본인이 작성한 후기만 수정할 수 있습니다.",
        variant: "destructive",
      });
      return;
    }
    
    setReviewToEdit(review);
    setNewReviewForm({
      title: review.title,
      content: review.content,
      location: review.location,
      propertyType: review.propertyType,
      dealType: review.dealType,
      rating: review.rating,
    });
    setIsEditDialogOpen(true);
  };
  
  const handleOpenDeleteDialog = (reviewId: string) => {
    const review = reviews.find(r => r.id === reviewId);
    
    if (!isAuthenticated || (user?.id !== review?.authorId)) {
      toast({
        title: "권한 없음",
        description: "본인이 작성한 후기만 삭제할 수 있습니다.",
        variant: "destructive",
      });
      return;
    }
    
    setReviewToDelete(reviewId);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteReview = () => {
    if (!reviewToDelete) return;
    
    setReviews(reviews.filter(review => review.id !== reviewToDelete));
    setIsDeleteDialogOpen(false);
    setReviewToDelete(null);
    
    toast({
      description: "후기가 삭제되었습니다.",
    });
  };
  
  const handleLikeReview = (reviewId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "로그인 필요",
        description: "좋아요를 누르려면 로그인이 필요합니다.",
      });
      return;
    }
    
    setReviews(
      reviews.map(review =>
        review.id === reviewId
          ? { ...review, likes: review.likes + 1 }
          : review
      )
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">후기 게시판</h1>
          
          <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Input
                placeholder="후기 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64"
              />
              {searchQuery && (
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchQuery("")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <Button onClick={handleOpenNewReviewDialog}>
              후기 작성하기
            </Button>
          </div>
        </div>
        
        {filteredReviews.length > 0 ? (
          <div className="space-y-6">
            {filteredReviews.map((review) => (
              <Card key={review.id} className="card-hover">
                <CardHeader>
                  <div className="flex justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src={review.profileImage} />
                        <AvatarFallback>{review.author.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-xl">{review.title}</CardTitle>
                        <div className="flex items-center mt-1 space-x-2 text-sm text-gray-500">
                          <span>{review.author}</span>
                          <span>•</span>
                          <span>{review.date}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="outline">{review.location}</Badge>
                          <Badge variant="outline">{review.propertyType}</Badge>
                          <Badge variant="outline">{review.dealType}</Badge>
                          <div className="flex items-center">
                            <RatingStars rating={review.rating} />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {user?.id === review.authorId && (
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditReview(review)}>
                          수정
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleOpenDeleteDialog(review.id)}>
                          삭제
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line text-gray-700">{review.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center space-x-6">
                    <button 
                      className="flex items-center space-x-1 text-gray-500 hover:text-realestate-primary"
                      onClick={() => handleLikeReview(review.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      <span>{review.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-realestate-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>{review.comments}</span>
                    </button>
                  </div>
                  <Button variant="ghost" size="sm">
                    댓글 달기
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
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
              <p className="text-lg font-medium mb-2">
                {searchQuery ? "검색 결과가 없습니다" : "아직 작성된 후기가 없습니다"}
              </p>
              <p className="text-gray-500 mb-6">
                {searchQuery ? "다른 검색어로 다시 시도해보세요" : "첫 번째 후기를 작성해보세요!"}
              </p>
              {searchQuery ? (
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  검색 초기화
                </Button>
              ) : (
                <Button onClick={handleOpenNewReviewDialog}>
                  첫 후기 작성하기
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* New Review Dialog */}
      <Dialog open={isNewReviewDialogOpen} onOpenChange={setIsNewReviewDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>새 후기 작성</DialogTitle>
            <DialogDescription>
              부동산 매물에 대한 경험을 공유하고 다른 사용자들에게 도움을 주세요.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">제목</Label>
              <Input
                id="title"
                value={newReviewForm.title}
                onChange={(e) => setNewReviewForm({ ...newReviewForm, title: e.target.value })}
                placeholder="제목을 입력하세요"
              />
            </div>
            
            <div>
              <Label htmlFor="content">내용</Label>
              <Textarea
                id="content"
                rows={6}
                value={newReviewForm.content}
                onChange={(e) => setNewReviewForm({ ...newReviewForm, content: e.target.value })}
                placeholder="후기 내용을 자세히 작성해주세요"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">지역</Label>
                <Input
                  id="location"
                  value={newReviewForm.location}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, location: e.target.value })}
                  placeholder="예) 서울특별시 강남구"
                />
              </div>
              
              <div>
                <Label htmlFor="propertyType">매물 종류</Label>
                <Input
                  id="propertyType"
                  value={newReviewForm.propertyType}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, propertyType: e.target.value })}
                  placeholder="예) 아파트, 빌라, 오피스텔"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dealType">거래 유형</Label>
                <Input
                  id="dealType"
                  value={newReviewForm.dealType}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, dealType: e.target.value })}
                  placeholder="예) 매매, 전세, 월세"
                />
              </div>
              
              <div>
                <Label>평점</Label>
                <div className="flex items-center mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setNewReviewForm({ ...newReviewForm, rating: i + 1 })}
                      className="text-2xl p-0 focus:outline-none"
                    >
                      <svg
                        className={`h-6 w-6 ${
                          i < newReviewForm.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                  <span className="ml-2 text-gray-600">{newReviewForm.rating}/5</span>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewReviewDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleCreateReview}>등록하기</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Review Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>후기 수정</DialogTitle>
            <DialogDescription>
              작성한 후기 내용을 수정할 수 있습니다.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">제목</Label>
              <Input
                id="edit-title"
                value={newReviewForm.title}
                onChange={(e) => setNewReviewForm({ ...newReviewForm, title: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="edit-content">내용</Label>
              <Textarea
                id="edit-content"
                rows={6}
                value={newReviewForm.content}
                onChange={(e) => setNewReviewForm({ ...newReviewForm, content: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-location">지역</Label>
                <Input
                  id="edit-location"
                  value={newReviewForm.location}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, location: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="edit-propertyType">매물 종류</Label>
                <Input
                  id="edit-propertyType"
                  value={newReviewForm.propertyType}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, propertyType: e.target.value })}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-dealType">거래 유형</Label>
                <Input
                  id="edit-dealType"
                  value={newReviewForm.dealType}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, dealType: e.target.value })}
                />
              </div>
              
              <div>
                <Label>평점</Label>
                <div className="flex items-center mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setNewReviewForm({ ...newReviewForm, rating: i + 1 })}
                      className="text-2xl p-0 focus:outline-none"
                    >
                      <svg
                        className={`h-6 w-6 ${
                          i < newReviewForm.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                  <span className="ml-2 text-gray-600">{newReviewForm.rating}/5</span>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleCreateReview}>수정하기</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>후기 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              정말로 이 후기를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteReview} className="bg-destructive text-destructive-foreground">
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ReviewsPage;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Clock, 
  Star, 
  Phone, 
  Mail, 
  Send, 
  Calendar,
  Award,
  ThumbsUp,
  MessageCircle
} from "lucide-react";
import { ReviewRatingModal } from "@/components/reviews/ReviewRatingModal";
import { ChatModal } from "@/components/chat/ChatModal";

// Mock worker data - this would come from your backend
const workerData = {
  id: "1",
  firstName: "John",
  lastName: "Smith",
  profession: "Electrician",
  experience: 8,
  location: "Mumbai, Maharashtra",
  email: "john.smith@email.com",
  phone: "+91 9876543210",
  bio: "Professional electrician with 8 years of experience in residential and commercial electrical work. Specialized in wiring, installations, and repairs.",
  skills: ["Electrical Wiring", "Home Automation", "Solar Panel Installation", "Circuit Repair", "LED Installation"],
  rating: 4.8,
  totalReviews: 127,
  profilePhoto: "/placeholder.svg",
  workImages: [
    "/placeholder.svg",
    "/placeholder.svg", 
    "/placeholder.svg"
  ],
  availability: "Available",
  completedJobs: 156,
  responseTime: "2 hours"
};

const WorkerProfile = () => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Banner */}
        <Card className="mb-8 bg-gradient-card border-0 shadow-card">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <Avatar className="w-32 h-32 border-4 border-primary/20">
                  <AvatarImage src={workerData.profilePhoto} alt={`${workerData.firstName} ${workerData.lastName}`} />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {workerData.firstName[0]}{workerData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    {workerData.firstName} {workerData.lastName}
                  </h1>
                  <p className="text-xl text-primary font-semibold">{workerData.profession}</p>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {workerData.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {workerData.experience} years experience
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    {workerData.rating} ({workerData.totalReviews} reviews)
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {workerData.bio}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {workerData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col gap-3 lg:w-48">
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-primary"
                  onClick={() => setIsChatModalOpen(true)}
                >
                  <Send className="h-4 w-4" />
                  Send Request
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                  onClick={() => setIsReviewModalOpen(true)}
                >
                  <Star className="h-4 w-4" />
                  Write Review
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 text-center bg-background border border-border">
                <div className="text-2xl font-bold text-primary">{workerData.completedJobs}</div>
                <div className="text-sm text-muted-foreground">Jobs Completed</div>
              </Card>
              <Card className="p-4 text-center bg-background border border-border">
                <div className="text-2xl font-bold text-accent">{workerData.rating}</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </Card>
              <Card className="p-4 text-center bg-background border border-border">
                <div className="text-2xl font-bold text-primary">{workerData.responseTime}</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </Card>
              <Card className="p-4 text-center bg-background border border-border">
                <div className="text-2xl font-bold text-accent">{workerData.availability}</div>
                <div className="text-sm text-muted-foreground">Status</div>
              </Card>
            </div>

            {/* Work Images */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Previous Work
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {workerData.workImages.map((image, index) => (
                    <div key={index} className="aspect-square bg-muted rounded-lg overflow-hidden">
                      <img 
                        src={image} 
                        alt={`Work ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    Recent Reviews
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    {workerData.rating} average • {workerData.totalReviews} reviews
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Sample reviews */}
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-accent text-accent-foreground">
                              U{review}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-foreground">Customer {review}</div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${i < 5 ? 'fill-current text-yellow-500' : 'text-muted-foreground'}`} 
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">2 days ago</div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed ml-13">
                        Excellent work! Very professional and completed the job on time. 
                        Would definitely recommend and hire again.
                      </p>
                      {review !== 3 && <Separator />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{workerData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{workerData.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{workerData.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setIsChatModalOpen(true)}
                  >
                    <Calendar className="h-4 w-4" />
                    Schedule Meeting
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setIsReviewModalOpen(true)}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    Recommend Worker
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Send className="h-4 w-4" />
                    Share Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ReviewRatingModal 
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        workerId={workerData.id}
        workerName={`${workerData.firstName} ${workerData.lastName}`}
      />
      
      <ChatModal 
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        workerId={workerData.id}
        workerName={`${workerData.firstName} ${workerData.lastName}`}
      />
    </div>
  );
};

export default WorkerProfile;
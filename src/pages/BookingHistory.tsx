import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Phone, Star } from "lucide-react";

const BookingHistory = () => {
  const bookings = [
    {
      id: "1",
      workerName: "John Smith",
      profession: "Electrician",
      status: "completed",
      date: "2024-01-15",
      time: "10:00 AM",
      location: "Mumbai, Maharashtra",
      price: "₹2,500",
      rating: 5
    },
    {
      id: "2", 
      workerName: "Sarah Johnson",
      profession: "Plumber",
      status: "pending",
      date: "2024-01-20",
      time: "2:00 PM", 
      location: "Delhi, India",
      price: "₹1,800",
      rating: null
    },
    {
      id: "3",
      workerName: "Mike Wilson", 
      profession: "Carpenter",
      status: "approved",
      date: "2024-01-18",
      time: "9:00 AM",
      location: "Bangalore, Karnataka", 
      price: "₹3,200",
      rating: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "approved": return "bg-blue-500"; 
      case "completed": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const filterBookings = (status: string) => {
    if (status === "all") return bookings;
    return bookings.filter(booking => booking.status === status);
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Booking History</h1>
          <p className="text-muted-foreground">Track all your service bookings</p>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All ({bookings.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({filterBookings("pending").length})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({filterBookings("approved").length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({filterBookings("completed").length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} getStatusColor={getStatusColor} />
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {filterBookings("pending").map((booking) => (
              <BookingCard key={booking.id} booking={booking} getStatusColor={getStatusColor} />
            ))}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            {filterBookings("approved").map((booking) => (
              <BookingCard key={booking.id} booking={booking} getStatusColor={getStatusColor} />
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {filterBookings("completed").map((booking) => (
              <BookingCard key={booking.id} booking={booking} getStatusColor={getStatusColor} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const BookingCard = ({ booking, getStatusColor }: any) => (
  <Card className="hover:shadow-card transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src="/placeholder.svg" alt={booking.workerName} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {booking.workerName.split(' ').map((n: string) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-2">
            <div>
              <h3 className="font-semibold text-foreground">{booking.workerName}</h3>
              <p className="text-sm text-primary">{booking.profession}</p>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {booking.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {booking.time}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {booking.location}
              </div>
            </div>
          </div>
        </div>

        <div className="text-right space-y-2">
          <Badge className={`${getStatusColor(booking.status)} text-white capitalize`}>
            {booking.status}
          </Badge>
          <div className="text-lg font-bold text-foreground">{booking.price}</div>
          {booking.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-current text-yellow-500" />
              <span className="text-sm">{booking.rating}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <Button variant="outline" size="sm">
          <Phone className="h-4 w-4" />
          Contact
        </Button>
        {booking.status === "completed" && !booking.rating && (
          <Button size="sm">
            <Star className="h-4 w-4" />
            Rate Service
          </Button>
        )}
      </div>
    </CardContent>
  </Card>
);

export default BookingHistory;
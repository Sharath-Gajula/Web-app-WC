import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone, MessageCircle } from "lucide-react";

const FeaturedWorkers = () => {
  const workers = [
    {
      id: 1,
      name: "John Martinez",
      profession: "Master Plumber",
      rating: 4.9,
      reviews: 127,
      location: "Downtown Area",
      skills: ["Emergency Repairs", "Installations", "Maintenance"],
      hourlyRate: "$85",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Sarah Chen",
      profession: "Licensed Electrician",
      rating: 4.8,
      reviews: 89,
      location: "Westside",
      skills: ["Wiring", "Panel Upgrades", "Smart Home"],
      hourlyRate: "$75",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Mike Johnson",
      profession: "Professional Painter",
      rating: 4.9,
      reviews: 156,
      location: "East District",
      skills: ["Interior", "Exterior", "Decorative"],
      hourlyRate: "$45",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Featured Workers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet our top-rated professionals ready to help with your projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workers.map((worker, index) => (
            <Card 
              key={worker.id}
              className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={worker.image}
                    alt={worker.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {worker.name}
                    </h3>
                    <p className="text-primary font-medium">
                      {worker.profession}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{worker.rating}</span>
                  </div>
                  <span className="text-muted-foreground">
                    ({worker.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{worker.location}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {worker.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-accent">
                    {worker.hourlyRate}/hr
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="hero" className="flex-1">
                    <MessageCircle className="h-4 w-4" />
                    Contact
                  </Button>
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            View All Workers
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorkers;
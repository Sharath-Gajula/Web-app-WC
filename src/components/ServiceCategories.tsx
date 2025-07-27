import { Card, CardContent } from "@/components/ui/card";
import { 
  Wrench, 
  Zap, 
  PaintBucket, 
  Hammer, 
  Car, 
  Laptop,
  Scissors,
  Home
} from "lucide-react";

const ServiceCategories = () => {
  const categories = [
    {
      icon: Wrench,
      title: "Plumbing",
      description: "Repairs, installations, and maintenance",
      count: "450+ workers"
    },
    {
      icon: Zap,
      title: "Electrical",
      description: "Wiring, repairs, and installations",
      count: "380+ workers"
    },
    {
      icon: PaintBucket,
      title: "Painting",
      description: "Interior and exterior painting services",
      count: "290+ workers"
    },
    {
      icon: Hammer,
      title: "Handyman",
      description: "General repairs and maintenance",
      count: "520+ workers"
    },
    {
      icon: Car,
      title: "Automotive",
      description: "Car repairs and maintenance",
      count: "180+ workers"
    },
    {
      icon: Laptop,
      title: "Tech Support",
      description: "Computer and device repairs",
      count: "150+ workers"
    },
    {
      icon: Scissors,
      title: "Beauty & Wellness",
      description: "Hair, nails, and beauty services",
      count: "220+ workers"
    },
    {
      icon: Home,
      title: "Cleaning",
      description: "Home and office cleaning services",
      count: "340+ workers"
    }
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Popular Service Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our most requested services and find the right professional for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card 
              key={category.title}
              className="group cursor-pointer hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 rounded-full p-4 mb-4 mx-auto w-fit group-hover:bg-primary/20 transition-colors duration-300">
                  <category.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {category.description}
                </p>
                <span className="text-xs text-primary font-medium">
                  {category.count}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
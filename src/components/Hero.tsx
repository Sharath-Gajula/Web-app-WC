import { Button } from "@/components/ui/button";
import { Search, UserPlus, Star } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Professional workers"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Connect with
                <span className="bg-gradient-primary bg-clip-text text-transparent ml-3">
                  Skilled Workers
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
                Find trusted professionals for your home and business needs. From plumbing to electrical work, 
                connect with verified experts in your area.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="hero" className="text-lg px-8 py-4">
                <Search className="h-5 w-5" />
                Find Workers
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                <UserPlus className="h-5 w-5" />
                Join as Worker
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">5K+</div>
                <div className="text-sm text-muted-foreground">Verified Workers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-accent">10K+</div>
                <div className="text-sm text-muted-foreground">Jobs Completed</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-2xl sm:text-3xl font-bold text-primary">
                  4.9 <Star className="h-6 w-6 fill-current" />
                </div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
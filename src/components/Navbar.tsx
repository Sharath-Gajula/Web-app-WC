import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Users, Home, User, LogIn } from "lucide-react";
import { LoginModal } from "@/components/auth/LoginModal";
import { WorkerRegistration } from "@/components/auth/WorkerRegistration";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isWorkerRegistrationOpen, setIsWorkerRegistrationOpen] = useState(false);

  const navItems = [
    { label: "Home", icon: Home, href: "#home" },
    { label: "About", icon: Users, href: "#about" },
    { label: "My Profile", icon: User, href: "#profile" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <Users className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="ml-3 text-xl font-bold text-foreground">
              Worker Connect
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent/50"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Login Button */}
          <div className="hidden md:block">
            <Button 
              variant="hero" 
              className="ml-4"
              onClick={() => setIsLoginModalOpen(true)}
            >
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </a>
              ))}
              <div className="pt-2">
                <Button 
                  variant="hero" 
                  className="w-full"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
      />

      {/* Worker Registration Modal */}
      <WorkerRegistration 
        isOpen={isWorkerRegistrationOpen} 
        onClose={() => setIsWorkerRegistrationOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
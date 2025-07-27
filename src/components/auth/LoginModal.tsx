import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, User, Mail, Lock, Phone, MapPin, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type UserRole = "customer" | "worker" | null;
type AuthMode = "login" | "signup";

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const { toast } = useToast();

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleBack = () => {
    setSelectedRole(null);
    setAuthMode("login");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Authentication",
      description: `${authMode === "login" ? "Login" : "Signup"} successful as ${selectedRole}!`,
    });
    onClose();
  };

  const resetModal = () => {
    setSelectedRole(null);
    setAuthMode("login");
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-foreground">
            {!selectedRole ? "Join Worker Connect" : 
             `${authMode === "login" ? "Login" : "Sign Up"} as ${selectedRole === "customer" ? "Customer" : "Worker"}`}
          </DialogTitle>
        </DialogHeader>

        {!selectedRole ? (
          <RoleSelection onRoleSelect={handleRoleSelect} />
        ) : authMode === "login" ? (
          <LoginForm 
            role={selectedRole} 
            onBack={handleBack}
            onSwitchToSignup={() => setAuthMode("signup")}
            onSubmit={handleSubmit}
          />
        ) : (
          <SignupForm 
            role={selectedRole} 
            onBack={handleBack}
            onSwitchToLogin={() => setAuthMode("login")}
            onSubmit={handleSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

const RoleSelection = ({ onRoleSelect }: { onRoleSelect: (role: UserRole) => void }) => (
  <div className="space-y-4">
    <p className="text-center text-muted-foreground">Choose your role to continue</p>
    
    <div className="grid grid-cols-1 gap-4">
      <Button
        variant="outline"
        size="lg"
        className="h-20 flex flex-col gap-2 hover:bg-primary/5 border-2 hover:border-primary/20"
        onClick={() => onRoleSelect("customer")}
      >
        <User className="h-8 w-8 text-primary" />
        <span className="font-semibold">I'm a Customer</span>
        <span className="text-xs text-muted-foreground">Looking to hire workers</span>
      </Button>
      
      <Button
        variant="outline"
        size="lg"
        className="h-20 flex flex-col gap-2 hover:bg-accent/5 border-2 hover:border-accent/20"
        onClick={() => onRoleSelect("worker")}
      >
        <Users className="h-8 w-8 text-accent" />
        <span className="font-semibold">I'm a Worker</span>
        <span className="text-xs text-muted-foreground">Ready to offer services</span>
      </Button>
    </div>
  </div>
);

interface FormProps {
  role: UserRole;
  onBack: () => void;
  onSwitchToSignup?: () => void;
  onSwitchToLogin?: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const LoginForm = ({ role, onBack, onSwitchToSignup, onSubmit }: FormProps) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <div className="relative">
        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input id="email" type="email" placeholder="Enter your email" className="pl-10" required />
      </div>
    </div>
    
    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <div className="relative">
        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input id="password" type="password" placeholder="Enter your password" className="pl-10" required />
      </div>
    </div>

    <div className="flex flex-col gap-3 pt-4">
      <Button type="submit" size="lg" className="w-full">
        Login as {role === "customer" ? "Customer" : "Worker"}
      </Button>
      
      <div className="flex justify-between text-sm">
        <Button type="button" variant="ghost" size="sm" onClick={onBack}>
          ← Back
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={onSwitchToSignup}>
          Need an account? Sign up
        </Button>
      </div>
    </div>
  </form>
);

const SignupForm = ({ role, onBack, onSwitchToLogin, onSubmit }: FormProps) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="name">Full Name</Label>
      <div className="relative">
        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input id="name" placeholder="Enter your full name" className="pl-10" required />
      </div>
    </div>

    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <div className="relative">
        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input id="email" type="email" placeholder="Enter your email" className="pl-10" required />
      </div>
    </div>
    
    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <div className="relative">
        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input id="password" type="password" placeholder="Create a password" className="pl-10" required />
      </div>
    </div>

    <div className="space-y-2">
      <Label htmlFor="phone">Phone Number</Label>
      <div className="relative">
        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input id="phone" type="tel" placeholder="Enter your phone number" className="pl-10" required />
      </div>
    </div>

    <div className="space-y-2">
      <Label htmlFor="location">Location</Label>
      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input id="location" placeholder="Enter your location" className="pl-10" required />
      </div>
    </div>

    {role === "customer" && (
      <div className="space-y-2">
        <Label htmlFor="profilePic">Profile Picture</Label>
        <div className="relative">
          <Upload className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input id="profilePic" type="file" accept="image/*" className="pl-10" />
        </div>
      </div>
    )}

    <div className="flex flex-col gap-3 pt-4">
      <Button type="submit" size="lg" className="w-full">
        {role === "worker" ? "Continue to Worker Registration" : "Create Customer Account"}
      </Button>
      
      <div className="flex justify-between text-sm">
        <Button type="button" variant="ghost" size="sm" onClick={onBack}>
          ← Back
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={onSwitchToLogin}>
          Have an account? Login
        </Button>
      </div>
    </div>
  </form>
);
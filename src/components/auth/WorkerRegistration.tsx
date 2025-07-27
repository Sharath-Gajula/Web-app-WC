import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Upload, 
  X, 
  Plus,
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  Camera,
  Video
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WorkerRegistrationProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  profession: string;
  experience: string;
  location: string;
  email: string;
  phone: string;
  bio: string;
  skills: string[];
  aadharNumber: string;
  aadharCard: File | null;
  profilePhoto: File | null;
  workImages: File[];
  introVideo: File | null;
}

const professions = [
  "Electrician", "Plumber", "Carpenter", "Painter", "Mechanic", 
  "Cleaner", "Gardener", "Cook", "Tutor", "Driver", "Other"
];

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  profession: "",
  experience: "",
  location: "",
  email: "",
  phone: "",
  bio: "",
  skills: [],
  aadharNumber: "",
  aadharCard: null,
  profilePhoto: null,
  workImages: [],
  introVideo: null,
};

export const WorkerRegistration = ({ isOpen, onClose }: WorkerRegistrationProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [skillInput, setSkillInput] = useState("");
  const { toast } = useToast();

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      updateFormData("skills", [...formData.skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    updateFormData("skills", formData.skills.filter(s => s !== skill));
  };

  const handleFileUpload = (field: keyof FormData, files: FileList | null, multiple = false) => {
    if (!files) return;
    
    if (multiple) {
      const fileArray = Array.from(files);
      updateFormData(field, fileArray);
    } else {
      updateFormData(field, files[0]);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Registration Successful!",
      description: "Your worker profile has been created successfully.",
    });
    setCurrentStep(1);
    setFormData(initialFormData);
    onClose();
  };

  const handleClose = () => {
    setCurrentStep(1);
    setFormData(initialFormData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-foreground">
            Worker Registration - Step {currentStep} of {totalSteps}
          </DialogTitle>
          <div className="space-y-2">
            <Progress value={progress} className="w-full h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Personal Info</span>
              <span>Contact</span>
              <span>Documents</span>
              <span>Review</span>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {currentStep === 1 && <PersonalInfoStep formData={formData} updateFormData={updateFormData} />}
          {currentStep === 2 && (
            <ContactStep 
              formData={formData} 
              updateFormData={updateFormData}
              skillInput={skillInput}
              setSkillInput={setSkillInput}
              addSkill={addSkill}
              removeSkill={removeSkill}
            />
          )}
          {currentStep === 3 && <DocumentsStep formData={formData} handleFileUpload={handleFileUpload} />}
          {currentStep === 4 && <ReviewStep formData={formData} onSubmit={handleSubmit} />}
        </div>

        <div className="flex justify-between pt-4">
          <Button 
            variant="outline" 
            onClick={prevStep} 
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
          
          {currentStep < totalSteps ? (
            <Button 
              onClick={nextStep}
              className="flex items-center gap-2"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-gradient-primary"
            >
              <Check className="h-4 w-4" />
              Create Profile
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const PersonalInfoStep = ({ formData, updateFormData }: {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
}) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
    
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name *</Label>
        <Input
          id="firstName"
          value={formData.firstName}
          onChange={(e) => updateFormData("firstName", e.target.value)}
          placeholder="Enter first name"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name *</Label>
        <Input
          id="lastName"
          value={formData.lastName}
          onChange={(e) => updateFormData("lastName", e.target.value)}
          placeholder="Enter last name"
          required
        />
      </div>
    </div>

    <div className="space-y-2">
      <Label htmlFor="profession">Profession *</Label>
      <Select value={formData.profession} onValueChange={(value) => updateFormData("profession", value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select your profession" />
        </SelectTrigger>
        <SelectContent className="bg-background border border-border z-50">
          {professions.map((profession) => (
            <SelectItem key={profession} value={profession}>
              {profession}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <div className="space-y-2">
      <Label htmlFor="experience">Experience (Years) *</Label>
      <Input
        id="experience"
        type="number"
        value={formData.experience}
        onChange={(e) => updateFormData("experience", e.target.value)}
        placeholder="Enter years of experience"
        min="0"
        required
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="location">Location *</Label>
      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => updateFormData("location", e.target.value)}
          placeholder="Enter your location"
          className="pl-10"
          required
        />
      </div>
    </div>
  </div>
);

const ContactStep = ({ 
  formData, 
  updateFormData, 
  skillInput, 
  setSkillInput, 
  addSkill, 
  removeSkill 
}: {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
  skillInput: string;
  setSkillInput: (value: string) => void;
  addSkill: () => void;
  removeSkill: (skill: string) => void;
}) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
    
    <div className="space-y-2">
      <Label htmlFor="email">Email *</Label>
      <div className="relative">
        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData("email", e.target.value)}
          placeholder="Enter your email"
          className="pl-10"
          required
        />
      </div>
    </div>

    <div className="space-y-2">
      <Label htmlFor="phone">Phone Number *</Label>
      <div className="relative">
        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => updateFormData("phone", e.target.value)}
          placeholder="Enter your phone number"
          className="pl-10"
          required
        />
      </div>
    </div>

    <div className="space-y-2">
      <Label htmlFor="bio">Short Bio</Label>
      <Textarea
        id="bio"
        value={formData.bio}
        onChange={(e) => updateFormData("bio", e.target.value)}
        placeholder="Tell us about yourself and your services..."
        rows={3}
      />
    </div>

    <div className="space-y-2">
      <Label>Skills</Label>
      <div className="flex gap-2">
        <Input
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          placeholder="Add a skill"
          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
        />
        <Button type="button" onClick={addSkill} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {formData.skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="flex items-center gap-1">
            {skill}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeSkill(skill)}
              className="h-auto p-0 hover:bg-transparent"
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  </div>
);

const DocumentsStep = ({ formData, handleFileUpload }: {
  formData: FormData;
  handleFileUpload: (field: keyof FormData, files: FileList | null, multiple?: boolean) => void;
}) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Documents & Media</h3>
    
    <div className="space-y-2">
      <Label htmlFor="aadharNumber">Aadhar Number *</Label>
      <Input
        id="aadharNumber"
        value={formData.aadharNumber}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, '').slice(0, 12);
          handleFileUpload("aadharNumber" as keyof FormData, null);
        }}
        placeholder="Enter 12-digit Aadhar number"
        maxLength={12}
        required
      />
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="aadharCard">Aadhar Card Image *</Label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="aadharCard"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload("aadharCard", e.target.files)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="profilePhoto">Profile Photo *</Label>
        <div className="relative">
          <Camera className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="profilePhoto"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload("profilePhoto", e.target.files)}
            className="pl-10"
            required
          />
        </div>
      </div>
    </div>

    <div className="space-y-2">
      <Label htmlFor="workImages">Previous Work Images</Label>
      <div className="relative">
        <Upload className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          id="workImages"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileUpload("workImages", e.target.files, true)}
          className="pl-10"
        />
      </div>
      <p className="text-xs text-muted-foreground">Upload multiple images of your previous work</p>
    </div>

    <div className="space-y-2">
      <Label htmlFor="introVideo">Short Intro Video (Optional)</Label>
      <div className="relative">
        <Video className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          id="introVideo"
          type="file"
          accept="video/*"
          onChange={(e) => handleFileUpload("introVideo", e.target.files)}
          className="pl-10"
        />
      </div>
      <p className="text-xs text-muted-foreground">Upload a short video introducing yourself (max 2 minutes)</p>
    </div>
  </div>
);

const ReviewStep = ({ formData, onSubmit }: {
  formData: FormData;
  onSubmit: () => void;
}) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Review & Submit</h3>
    
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</p>
        <p><span className="font-medium">Profession:</span> {formData.profession}</p>
        <p><span className="font-medium">Experience:</span> {formData.experience} years</p>
        <p><span className="font-medium">Location:</span> {formData.location}</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="text-base">Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p><span className="font-medium">Email:</span> {formData.email}</p>
        <p><span className="font-medium">Phone:</span> {formData.phone}</p>
        <p><span className="font-medium">Bio:</span> {formData.bio || "Not provided"}</p>
        <div>
          <span className="font-medium">Skills:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {formData.skills.map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="text-base">Documents & Media</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p><span className="font-medium">Aadhar Number:</span> {formData.aadharNumber}</p>
        <p><span className="font-medium">Aadhar Card:</span> {formData.aadharCard?.name || "Not uploaded"}</p>
        <p><span className="font-medium">Profile Photo:</span> {formData.profilePhoto?.name || "Not uploaded"}</p>
        <p><span className="font-medium">Work Images:</span> {formData.workImages.length} files uploaded</p>
        <p><span className="font-medium">Intro Video:</span> {formData.introVideo?.name || "Not uploaded"}</p>
      </CardContent>
    </Card>

    <div className="bg-accent/10 p-4 rounded-lg">
      <p className="text-sm text-foreground">
        By clicking "Create Profile", you agree to our terms of service and privacy policy. 
        Your profile will be reviewed and activated within 24 hours.
      </p>
    </div>
  </div>
);
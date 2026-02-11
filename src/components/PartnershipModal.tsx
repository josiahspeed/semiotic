import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ArrowLeft, CheckCircle2, Building2, Target, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PartnershipModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  companyName: string;
  contactName: string;
  email: string;
  goals: string;
}

interface ApiError {
  message: string;
  status?: number;
}

const PartnershipModal = ({ open, onOpenChange }: PartnershipModalProps) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    contactName: "",
    email: "",
    goals: "",
  });

  const totalSteps = 2;

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.companyName.trim() || !formData.contactName.trim() || !formData.email.trim()) {
          toast({
            title: "Missing information",
            description: "Please fill in all fields",
            variant: "destructive",
          });
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          toast({
            title: "Invalid email",
            description: "Please enter a valid email address",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case 2:
        if (!formData.goals.trim()) {
          toast({
            title: "Missing information",
            description: "Please describe your goals",
            variant: "destructive",
          });
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < totalSteps) {
        setStep(step + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("send-partnership-inquiry", {
        body: formData,
      });

      if (error) {
        const apiError: ApiError = { message: error.message || "Failed to submit inquiry" };
        throw apiError;
      }

      setIsSubmitted(true);
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: "Submission failed",
        description: apiError.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset form after animation completes
    setTimeout(() => {
      setStep(1);
      setIsSubmitted(false);
      setFormData({
        companyName: "",
        contactName: "",
        email: "",
        goals: "",
      });
    }, 300);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-6">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`h-2 rounded-full transition-all duration-300 ${
            index + 1 === step
              ? "w-8 bg-primary"
              : index + 1 < step
              ? "w-2 bg-primary"
              : "w-2 bg-muted"
          }`}
        />
      ))}
    </div>
  );

  const renderStep = () => {
    if (isSubmitted) {
      return (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-4">Thank You!</h3>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            We've received your partnership inquiry. Our team will review your submission and get back to you within <span className="font-semibold text-foreground">48 hours</span>.
          </p>
          <Button onClick={handleClose} className="bg-gradient-to-r from-cta-gradient-from to-cta-gradient-to hover:from-cta-gradient-from-hover hover:to-cta-gradient-to-hover">
            Close
          </Button>
        </div>
      );
    }

    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Company Information</h3>
                <p className="text-sm text-muted-foreground">Tell us about your organization</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  placeholder="Enter your company name"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="contactName">Your Name</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange("contactName", e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="email">Work Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="you@company.com"
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Project Goals</h3>
                <p className="text-sm text-muted-foreground">What do you want to achieve?</p>
              </div>
            </div>
            <div>
              <Label htmlFor="goals">Describe your goals and use case</Label>
              <Textarea
                id="goals"
                value={formData.goals}
                onChange={(e) => handleInputChange("goals", e.target.value)}
                placeholder="Tell us about the problems you're trying to solve, the agents you want to build, or how you envision using Agentium..."
                className="mt-1.5 min-h-[150px] resize-none"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-center">
            Partner With Us
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-6">
          {!isSubmitted && renderStepIndicator()}
          
          {renderStep()}

          {!isSubmitted && (
            <div className="flex justify-between mt-8 pt-4 border-t border-border">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={step === 1}
                className={step === 1 ? "invisible" : ""}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-cta-gradient-from to-cta-gradient-to hover:from-cta-gradient-from-hover hover:to-cta-gradient-to-hover"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : step === totalSteps ? (
                  "Submit"
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PartnershipModal;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ComplaintCategory } from "@/utils/types";

const categories: { id: ComplaintCategory; label: string; description: string }[] = [
  {
    id: "maintenance",
    label: "Maintenance",
    description: "Issues with room facilities, broken items, etc."
  },
  {
    id: "roommate",
    label: "Roommate",
    description: "Roommate conflicts, behavior issues, etc."
  },
  {
    id: "facilities",
    label: "Facilities",
    description: "Common areas, Wi-Fi, laundry, etc."
  },
  {
    id: "cleanliness",
    label: "Cleanliness",
    description: "Cleaning issues in rooms or common areas."
  },
  {
    id: "security",
    label: "Security",
    description: "Security concerns, suspicious activities, etc."
  },
  {
    id: "other",
    label: "Other",
    description: "Any other issues not covered above."
  }
];

const SubmitComplaint = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ComplaintCategory | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/student/login");
    } else if (user?.role !== "student") {
      navigate("/");
    }
  }, [isAuthenticated, navigate, user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || !selectedCategory) {
      toast({
        title: "Error",
        description: "Please fill in all fields and select a category",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // For this version, we're just mocking the submission
    // In a real app, this would send data to a backend
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Your complaint has been submitted successfully",
      });
      setIsSubmitting(false);
      navigate("/student/dashboard");
    }, 1500);
  };

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Submit a Complaint</h1>
      <p className="text-muted-foreground mb-8">
        Please provide details about your issue so we can help resolve it quickly.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <Label htmlFor="title" className="text-lg mb-2 block">Select complaint category</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`complaint-category cursor-pointer ${
                  selectedCategory === category.id ? "selected" : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="text-center">
                  <h3 className="font-semibold mb-1">{category.label}</h3>
                  <p className="text-xs text-gray-600">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Complaint Title</Label>
            <Input
              id="title"
              placeholder="Brief title for your complaint"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Detailed Description</Label>
            <Textarea
              id="description"
              placeholder="Please describe your issue in detail. Include relevant information like location, time, and any steps you've already taken."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              required
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/student/dashboard")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Complaint"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SubmitComplaint;


import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { filterProfanity } from "@/utils/profanityFilter";

interface FeedbackDialogProps {
  complaintId: string;
  open: boolean;
  onClose: () => void;
}

const FeedbackDialog = ({ complaintId, open, onClose }: FeedbackDialogProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    const filteredComment = filterProfanity(comment);
    
    // Here you would typically send the feedback to your backend
    console.log({ complaintId, rating, comment: filteredComment });
    
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback!",
    });
    
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit Feedback</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                key={star}
                variant={star <= rating ? "default" : "outline"}
                size="sm"
                onClick={() => setRating(star)}
              >
                {star}
              </Button>
            ))}
          </div>
          <Textarea
            placeholder="Write your feedback here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!rating || !comment.trim()}>
            Submit Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;


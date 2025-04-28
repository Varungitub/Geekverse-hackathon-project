
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageSquare } from "lucide-react";
import { Complaint, ComplaintStatus } from "@/utils/types";
import { useAuth } from "@/context/AuthContext";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeedbackDialog from "./FeedbackDialog";

interface ComplaintCardProps {
  complaint: Complaint;
  showActions?: boolean;
  onLike?: (complaintId: string) => void;
}

const getStatusColor = (status: ComplaintStatus) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "in-progress":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "resolved":
      return "bg-green-100 text-green-800 hover:bg-green-100";
  }
};

const getCategoryLabel = (category: string) => {
  return category.charAt(0).toUpperCase() + category.slice(1);
};

const ComplaintCard = ({ complaint, showActions = true, onLike }: ComplaintCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showFeedback, setShowFeedback] = useState(false);
  const timeAgo = formatDistanceToNow(new Date(complaint.createdAt), { addSuffix: true });
  
  const handleLike = () => {
    if (onLike && user) {
      onLike(complaint.id);
    }
  };

  const isLiked = user ? complaint.likedBy.includes(user.id) : false;

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{complaint.title}</CardTitle>
          <Badge variant="outline" className={getStatusColor(complaint.status)}>
            {complaint.status}
          </Badge>
        </div>
        <CardDescription className="flex items-center justify-between">
          <span>By {complaint.studentName}</span>
          <span className="text-xs text-muted-foreground">{timeAgo}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <Badge variant="secondary" className="mb-2">
          {getCategoryLabel(complaint.category)}
        </Badge>
        <p className="text-sm line-clamp-2">{complaint.description}</p>
      </CardContent>
      {showActions && (
        <CardFooter className="pt-2 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`flex items-center gap-1 ${isLiked ? 'text-primary' : ''}`}
              onClick={handleLike}
              disabled={!user}
            >
              <ThumbsUp className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{complaint.likes}</span>
            </Button>
            {complaint.status === "resolved" && user?.role === "student" && (
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setShowFeedback(true)}
              >
                <MessageSquare className="h-4 w-4" />
                <span>Feedback</span>
              </Button>
            )}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate(`/complaint/${complaint.id}`)}
          >
            View Details
          </Button>
        </CardFooter>
      )}
      {showFeedback && (
        <FeedbackDialog
          complaintId={complaint.id}
          open={showFeedback}
          onClose={() => setShowFeedback(false)}
        />
      )}
    </Card>
  );
};

export default ComplaintCard;

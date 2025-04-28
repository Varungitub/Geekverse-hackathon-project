export type UserRole = "student" | "staff";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type ComplaintStatus = "pending" | "in-progress" | "resolved";

export type ComplaintCategory = 
  | "maintenance" 
  | "roommate" 
  | "facilities" 
  | "cleanliness" 
  | "security" 
  | "other";

export interface Feedback {
  id: string;
  complaintId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Complaint {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  status: ComplaintStatus;
  createdAt: string;
  likes: number;
  likedBy: string[];
  replies: ComplaintReply[];
  feedback?: Feedback;
}

export interface ComplaintReply {
  id: string;
  complaintId: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  message: string;
  createdAt: string;
}

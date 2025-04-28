
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ComplaintCard from "@/components/ComplaintCard";
import { Complaint } from "@/utils/types";

// Mock data for complaints
const MOCK_COMPLAINTS: Complaint[] = [
  {
    id: "1",
    studentId: "STU001",
    studentName: "John Doe",
    title: "Broken shower in Room 102",
    description: "The shower in room 102 has been leaking for three days. Water is pooling on the floor creating a slip hazard.",
    category: "maintenance",
    status: "pending",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 0,
    likedBy: [],
    replies: []
  },
  {
    id: "2",
    studentId: "STU001",
    studentName: "John Doe",
    title: "Wi-Fi connectivity issues",
    description: "The Wi-Fi in the west wing has been extremely slow and frequently disconnects during study hours.",
    category: "facilities",
    status: "in-progress",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 3,
    likedBy: ["STU002", "STU003", "STU004"],
    replies: [
      {
        id: "reply1",
        complaintId: "2",
        userId: "STAFF001",
        userName: "Admin Staff",
        userRole: "staff",
        message: "We're working with our IT provider to resolve this issue. They'll be on site tomorrow to check the routers.",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  },
  {
    id: "3",
    studentId: "STU001",
    studentName: "John Doe",
    title: "Need extra blanket",
    description: "With the weather getting colder, I would like to request an extra blanket for my bed.",
    category: "other",
    status: "resolved",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 1,
    likedBy: ["STU002"],
    replies: [
      {
        id: "reply2",
        complaintId: "3",
        userId: "STAFF001",
        userName: "Admin Staff",
        userRole: "staff",
        message: "Extra blankets have been delivered to your room.",
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  }
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  // Mock data loading
  useEffect(() => {
    // In a real app, this would be an API call to get user's complaints
    if (user?.id) {
      setComplaints(MOCK_COMPLAINTS);
    }
  }, [user]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/student/login");
    } else if (user?.role !== "student") {
      navigate("/");
    }
  }, [isAuthenticated, navigate, user]);

  const filteredComplaints = complaints.filter(complaint => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return complaint.status === "pending";
    if (activeTab === "in-progress") return complaint.status === "in-progress";
    if (activeTab === "resolved") return complaint.status === "resolved";
    return true;
  });

  const sortedComplaints = [...filteredComplaints].sort((a, b) => b.likes - a.likes);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Your Dashboard</h1>
        <Button onClick={() => navigate("/submit-complaint")}>Submit New Complaint</Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          {sortedComplaints.length > 0 ? (
            <div className="space-y-4">
              {sortedComplaints.map(complaint => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No complaints found in this category</p>
              <Button variant="outline" onClick={() => navigate("/submit-complaint")}>
                Submit a Complaint
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDashboard;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ComplaintCard from "@/components/ComplaintCard";
import { Complaint } from "@/utils/types";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for all complaints
const ALL_MOCK_COMPLAINTS: Complaint[] = [
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
  },
  {
    id: "4",
    studentId: "STU002",
    studentName: "Jane Smith",
    title: "Noise complaint",
    description: "The students in Room 305 are playing loud music after quiet hours almost every night this week.",
    category: "roommate",
    status: "pending",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 4,
    likedBy: ["STU001", "STU003", "STU004", "STU005"],
    replies: []
  },
  {
    id: "5",
    studentId: "STU003",
    studentName: "Mike Johnson",
    title: "Common room cleanliness",
    description: "The common room on the second floor has not been cleaned for several days. There are food wrappers and empty cups everywhere.",
    category: "cleanliness",
    status: "in-progress",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 2,
    likedBy: ["STU001", "STU002"],
    replies: [
      {
        id: "reply3",
        complaintId: "5",
        userId: "STAFF001",
        userName: "Admin Staff",
        userRole: "staff",
        message: "Cleaning staff has been notified and will address this issue today.",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  }
];

const StaffDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Mock data loading
  useEffect(() => {
    // In a real app, this would be an API call to get all complaints
    setComplaints(ALL_MOCK_COMPLAINTS);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/staff/login");
    } else if (user?.role !== "staff") {
      navigate("/");
    }
  }, [isAuthenticated, navigate, user]);

  const filteredComplaints = complaints.filter(complaint => {
    // Filter by tab (status)
    if (activeTab !== "all" && complaint.status !== activeTab) return false;
    
    // Filter by search term
    if (
      searchTerm && 
      !complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !complaint.studentName.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    
    // Filter by category
    if (categoryFilter !== "all" && complaint.category !== categoryFilter) return false;
    
    return true;
  });

  const sortedComplaints = [...filteredComplaints].sort((a, b) => b.likes - a.likes);

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Staff Dashboard</h1>
        <p className="text-muted-foreground">Manage and respond to student complaints</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input 
            placeholder="Search by title, description, or student name" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="roommate">Roommate</SelectItem>
              <SelectItem value="facilities">Facilities</SelectItem>
              <SelectItem value="cleanliness">Cleanliness</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
              <p className="text-gray-500">No complaints found matching your filters</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffDashboard;

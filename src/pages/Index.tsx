
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-primary md:text-5xl lg:text-6xl">
          Hostel Complaint Management System
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A simple and efficient way to manage and resolve hostel complaints
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/student/login">
            <Button size="lg" className="w-full sm:w-auto">
              Student Login
            </Button>
          </Link>
          <Link to="/staff/login">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Staff Login
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
          </div>
          <h2 className="text-lg font-semibold mb-2">Easy Registration</h2>
          <p className="text-gray-600">Sign in using your student ID, email, and name to access the system.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M12 18v-6" /><path d="M8 18v-1" /><path d="M16 18v-3" /></svg>
          </div>
          <h2 className="text-lg font-semibold mb-2">Submit Complaints</h2>
          <p className="text-gray-600">Submit your complaints by category and track their resolution status.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /><path d="m13 13 6 6" /></svg>
          </div>
          <h2 className="text-lg font-semibold mb-2">Quick Resolution</h2>
          <p className="text-gray-600">Get real-time updates and responses from hostel staff on your complaints.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;

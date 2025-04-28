
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary">HostelCare</span>
            </Link>
          </div>
          
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">
                  Hello, {user?.name}
                </span>
                {user?.role === "student" ? (
                  <Link to="/student/dashboard">
                    <Button variant="outline" size="sm">Dashboard</Button>
                  </Link>
                ) : (
                  <Link to="/staff/dashboard">
                    <Button variant="outline" size="sm">Dashboard</Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/student/login">
                  <Button variant="outline" size="sm">Student Login</Button>
                </Link>
                <Link to="/staff/login">
                  <Button size="sm">Staff Login</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

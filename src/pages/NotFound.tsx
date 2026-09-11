import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-display font-black text-foreground mb-2">404</h1>
        <p className="text-xl font-bold text-foreground mb-2">Page Not Found</p>
        <p className="text-sm text-muted-foreground mb-8">
          The page <code className="text-primary">{location.pathname}</code> does not exist or has moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform glow-red"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

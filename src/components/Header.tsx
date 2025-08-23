import { Button } from "@/components/ui/button";
import { GraduationCap, Plus, Search, Trophy } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="p-2 bg-gradient-hero rounded-xl">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-foreground">SeniorWise</h1>
              <p className="text-xs text-muted-foreground">Student Mentorship</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            <Button
              variant={location.pathname === '/browse' ? 'default' : 'ghost'}
              onClick={() => navigate('/browse')}
              className="gap-2"
            >
              <Search className="w-4 h-4" />
              Browse Advice
            </Button>
            <Button
              variant={location.pathname === '/share' ? 'secondary' : 'ghost'}
              onClick={() => navigate('/share')}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Share Advice
            </Button>
            <Button
              variant={location.pathname === '/leaderboard' ? 'accent' : 'ghost'}
              onClick={() => navigate('/leaderboard')}
              className="gap-2"
            >
              <Trophy className="w-4 h-4" />
              Leaderboard
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
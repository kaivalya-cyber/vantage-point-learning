import { GraduationCap, Menu, BookOpen, Star, Users, MessageCircle, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { profile } = useProfile();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            <div className="p-2 bg-gradient-hero rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            SeniorWise
          </button>
          
          <nav className="hidden md:flex items-center gap-6">
            <Button 
              variant={isActive('/browse') ? "default" : "ghost"} 
              size="sm" 
              onClick={() => navigate('/browse')}
              className="gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Browse Advice
            </Button>
            <Button 
              variant={isActive('/share') ? "default" : "ghost"} 
              size="sm" 
              onClick={() => navigate('/share')}
              className="gap-2"
            >
              <Star className="w-4 h-4" />
              Share Wisdom
            </Button>
            <Button 
              variant={isActive('/questions') ? "default" : "ghost"} 
              size="sm" 
              onClick={() => navigate('/questions')}
              className="gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Q&A
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.avatar_url || ""} alt={profile?.display_name || "User"} />
                    <AvatarFallback>
                      {profile?.display_name?.charAt(0) || user.email?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium leading-none">{profile?.display_name || "User"}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={() => navigate('/auth?tab=signin')}>
                Sign In
              </Button>
              <Button variant="default" size="sm" onClick={() => navigate('/auth?tab=signup')}>
                Join Now
              </Button>
            </>
          )}
          
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
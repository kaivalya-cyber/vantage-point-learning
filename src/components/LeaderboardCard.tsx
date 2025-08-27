import { Badge } from "@/components/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Star, Award } from "lucide-react";
import { LeaderboardUser } from "@/hooks/useLeaderboard";

interface LeaderboardCardProps {
  user: LeaderboardUser;
  rank: number;
}

export const LeaderboardCard = ({ user, rank }: LeaderboardCardProps) => {
  const getRankIcon = () => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-accent" />;
    if (rank === 2) return <Award className="w-6 h-6 text-muted-foreground" />;
    if (rank === 3) return <Star className="w-6 h-6 text-secondary" />;
    return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</span>;
  };

  const getBadgeType = () => {
    if (user.reputation >= 1000) return 'legend';
    if (user.reputation >= 500) return 'expert';
    if (user.reputation >= 100) return 'contributor';
    return 'beginner';
  };

  return (
    <Card className="bg-gradient-card border-border shadow-card hover:shadow-button transition-smooth">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {getRankIcon()}
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar_url || ''} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user.display_name?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground truncate">
                {user.display_name || 'Anonymous User'}
              </h3>
              <Badge type={getBadgeType()} size="sm" />
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                {user.reputation} pts
              </span>
              <span>{user.total_answers} answers</span>
              <span>{user.helpful_answers} accepted</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
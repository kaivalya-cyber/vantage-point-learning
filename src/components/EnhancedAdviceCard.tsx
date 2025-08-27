import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Heart, MessageCircle, Star, Trophy, Award, BookOpen } from "lucide-react";
import { AdviceWithProfile } from "@/hooks/useAdvice";
import { Badge as CustomBadge } from "@/components/Badge";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface EnhancedAdviceCardProps extends AdviceWithProfile {
  onUpvote: (id: string) => Promise<{ error: string | null }>;
  onComment: (id: string) => void;
}

export const EnhancedAdviceCard = ({ onUpvote, onComment, ...advice }: EnhancedAdviceCardProps) => {
  const { user } = useAuth();
  const [isUpvoting, setIsUpvoting] = useState(false);

  const handleUpvote = async () => {
    if (!user) {
      toast.error("Please log in to upvote advice");
      return;
    }

    setIsUpvoting(true);
    const result = await onUpvote(advice.id);
    if (result.error) {
      toast.error(result.error);
    }
    setIsUpvoting(false);
  };

  const getDifficultyColor = () => {
    switch (advice.difficulty_rating) {
      case 'beginner': return 'bg-secondary text-secondary-foreground';
      case 'intermediate': return 'bg-accent text-accent-foreground';
      case 'advanced': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getBadgeType = (): 'beginner' | 'contributor' | 'expert' | 'legend' => {
    const reputation = advice.profiles?.reputation || 0;
    if (reputation >= 1000) return 'legend';
    if (reputation >= 500) return 'expert';
    if (reputation >= 100) return 'contributor';
    return 'beginner';
  };

  return (
    <Card className="bg-gradient-card border-border shadow-card hover:shadow-button transition-smooth">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {advice.is_anonymous ? 'A' : (advice.profiles?.display_name?.charAt(0)?.toUpperCase() || 'U')}
            </AvatarFallback>
          </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">
                  {advice.is_anonymous ? 'Anonymous' : (advice.profiles?.display_name || 'Student')}
                </span>
                {!advice.is_anonymous && advice.profiles && (
                  <CustomBadge type={getBadgeType()} size="sm" />
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{new Date(advice.created_at).toLocaleDateString()}</span>
                {advice.profiles?.reputation && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      <span>{advice.profiles.reputation} reputation</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {advice.difficulty_rating && (
              <Badge className={getDifficultyColor()}>
                {advice.difficulty_rating}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-lg text-foreground">{advice.course}</h3>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-secondary" />
              Study Tips
            </h4>
            <p className="text-foreground leading-relaxed">{advice.study_tip}</p>
          </div>

          {advice.mistake && (
            <div>
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Award className="w-4 h-4 text-destructive" />
                Common Mistakes to Avoid
              </h4>
              <p className="text-muted-foreground leading-relaxed">{advice.mistake}</p>
            </div>
          )}

          {advice.resources && (
            <div>
              <h4 className="font-medium text-foreground mb-2">📚 Helpful Resources</h4>
              <p className="text-muted-foreground leading-relaxed">{advice.resources}</p>
            </div>
          )}
        </div>

        {advice.tags && advice.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {advice.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleUpvote}
              disabled={isUpvoting}
              className={`gap-2 ${advice.user_has_upvoted ? 'text-destructive' : 'text-muted-foreground'}`}
            >
              <Heart className={`w-4 h-4 ${advice.user_has_upvoted ? 'fill-current' : ''}`} />
              {advice.upvotes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onComment(advice.id)}
              className="gap-2 text-muted-foreground"
            >
              <MessageCircle className="w-4 h-4" />
              Comment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "./Badge";
import { ThumbsUp, MessageCircle, User, BookOpen } from "lucide-react";

interface AdviceCardProps {
  id: string;
  course: string;
  studyTip: string;
  mistake: string;
  resources: string;
  author: string;
  isAnonymous: boolean;
  upvotes: number;
  comments: number;
  onUpvote: (id: string) => void;
  onComment: (id: string) => void;
}

export const AdviceCard = ({
  id,
  course,
  studyTip,
  mistake,
  resources,
  author,
  isAnonymous,
  upvotes,
  comments,
  onUpvote,
  onComment,
}: AdviceCardProps) => {
  return (
    <Card className="p-6 bg-gradient-card shadow-card border-border hover:shadow-glow transition-smooth">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{course}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>{isAnonymous ? 'Anonymous Senior' : author}</span>
              </div>
            </div>
          </div>
          <Badge type="contributor" size="sm" />
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-secondary mb-1">💡 Best Study Tip</h4>
            <p className="text-foreground">{studyTip}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-destructive mb-1">⚠️ Biggest Mistake</h4>
            <p className="text-foreground">{mistake}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-accent mb-1">📚 Helpful Resources</h4>
            <p className="text-foreground">{resources}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onUpvote(id)}
              className="gap-2"
            >
              <ThumbsUp className="w-4 h-4" />
              {upvotes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onComment(id)}
              className="gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              {comments}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
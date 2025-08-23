import { useState } from "react";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, Send, Star } from "lucide-react";

export default function Share() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    course: '',
    studyTip: '',
    mistake: '',
    resources: '',
    isAnonymous: false,
    followUpQuestions: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.course || !formData.studyTip || !formData.mistake) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the course, study tip, and biggest mistake fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate submission
    toast({
      title: "Advice Shared Successfully! 🎉",
      description: "Thank you for helping your fellow students. You've earned 10 points!",
    });
    
    // Reset form
    setFormData({
      course: '',
      studyTip: '',
      mistake: '',
      resources: '',
      isAnonymous: false,
      followUpQuestions: ''
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-hero rounded-2xl mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Share Your Wisdom</h1>
            <p className="text-muted-foreground">
              Help underclassmen succeed by sharing your experiences and insights.
            </p>
          </div>

          {/* Form */}
          <Card className="p-8 bg-gradient-card shadow-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Course Name */}
              <div className="space-y-2">
                <Label htmlFor="course" className="text-sm font-medium text-foreground">
                  Course Name *
                </Label>
                <Input
                  id="course"
                  placeholder="e.g., AP Calculus, Chemistry Honors, World History"
                  value={formData.course}
                  onChange={(e) => setFormData(prev => ({ ...prev, course: e.target.value }))}
                  className="bg-background"
                />
              </div>

              {/* Study Tip */}
              <div className="space-y-2">
                <Label htmlFor="studyTip" className="text-sm font-medium text-foreground">
                  Best Study Tip *
                </Label>
                <Textarea
                  id="studyTip"
                  placeholder="What's the most effective study strategy you discovered for this course?"
                  value={formData.studyTip}
                  onChange={(e) => setFormData(prev => ({ ...prev, studyTip: e.target.value }))}
                  className="bg-background min-h-[100px]"
                />
              </div>

              {/* Biggest Mistake */}
              <div className="space-y-2">
                <Label htmlFor="mistake" className="text-sm font-medium text-foreground">
                  Biggest Mistake You Made *
                </Label>
                <Textarea
                  id="mistake"
                  placeholder="What mistake do you wish you could have avoided? Help others learn from your experience."
                  value={formData.mistake}
                  onChange={(e) => setFormData(prev => ({ ...prev, mistake: e.target.value }))}
                  className="bg-background min-h-[100px]"
                />
              </div>

              {/* Resources */}
              <div className="space-y-2">
                <Label htmlFor="resources" className="text-sm font-medium text-foreground">
                  Helpful Resources & Tools
                </Label>
                <Textarea
                  id="resources"
                  placeholder="Share websites, apps, books, or study methods that helped you succeed."
                  value={formData.resources}
                  onChange={(e) => setFormData(prev => ({ ...prev, resources: e.target.value }))}
                  className="bg-background"
                />
              </div>

              {/* Follow-up Questions */}
              <div className="space-y-2">
                <Label htmlFor="followUp" className="text-sm font-medium text-foreground">
                  Questions You Can Answer
                </Label>
                <Textarea
                  id="followUp"
                  placeholder="What specific questions about this course are you willing to help with?"
                  value={formData.followUpQuestions}
                  onChange={(e) => setFormData(prev => ({ ...prev, followUpQuestions: e.target.value }))}
                  className="bg-background"
                />
              </div>

              {/* Anonymous Toggle */}
              <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
                <Switch
                  id="anonymous"
                  checked={formData.isAnonymous}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isAnonymous: checked }))}
                />
                <div className="space-y-1">
                  <Label htmlFor="anonymous" className="text-sm font-medium text-foreground">
                    Post Anonymously
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Your advice will be shared without your name attached.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" variant="hero" size="lg" className="w-full gap-2">
                <Send className="w-5 h-5" />
                Share My Advice
              </Button>
            </form>
          </Card>

          {/* Motivation Card */}
          <Card className="mt-6 p-6 bg-gradient-accent/10 border-accent/20">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-accent" />
              <div>
                <h3 className="font-semibold text-foreground">Earn Recognition!</h3>
                <p className="text-sm text-muted-foreground">
                  Every piece of advice you share earns points and helps you climb the leaderboard.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
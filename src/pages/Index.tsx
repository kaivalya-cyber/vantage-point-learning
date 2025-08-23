import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/Badge";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Users, BookOpen, Trophy, ArrowRight, Star, MessageCircle } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl mb-6 backdrop-blur-sm">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Learn from Those Who've
              <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Been There Before
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Connect with senior students who share real advice, study tips, and insights to help you succeed academically and prepare for college.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg" 
                className="gap-2 text-lg px-8"
                onClick={() => navigate('/browse')}
              >
                <BookOpen className="w-5 h-5" />
                Find Advice
              </Button>
              <Button 
                variant="accent" 
                size="lg" 
                className="gap-2 text-lg px-8"
                onClick={() => navigate('/share')}
              >
                <Star className="w-5 h-5" />
                Share Wisdom
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why SeniorWise Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A platform designed to create meaningful connections between experienced and aspiring students.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* For Freshmen */}
            <Card className="p-8 bg-gradient-card shadow-card text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">For Freshmen</h3>
              <ul className="text-muted-foreground space-y-2 text-left">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  Search advice by course and subject
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  Upvote the most helpful tips
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  Ask follow-up questions to seniors
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  Access aggregated "best-of" advice
                </li>
              </ul>
            </Card>

            {/* For Seniors */}
            <Card className="p-8 bg-gradient-card shadow-card text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-2xl mb-6">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">For Seniors</h3>
              <ul className="text-muted-foreground space-y-2 text-left">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-secondary" />
                  Share study tips and course insights
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-secondary" />
                  Earn badges and recognition points
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-secondary" />
                  Build mentorship portfolio
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-secondary" />
                  Post anonymously or publicly
                </li>
              </ul>
            </Card>

            {/* Community */}
            <Card className="p-8 bg-gradient-card shadow-card text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-6">
                <Trophy className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Community</h3>
              <ul className="text-muted-foreground space-y-2 text-left">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-accent" />
                  Leaderboard for top mentors
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-accent" />
                  Discussion groups and comments
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-accent" />
                  Thank and feedback system
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-accent" />
                  Mobile-first experience
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Advice Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Real Advice from Real Students
            </h2>
            <p className="text-muted-foreground">
              See what kinds of helpful insights you can discover and share.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="p-6 bg-gradient-card shadow-card">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">AP Chemistry</h3>
                      <p className="text-sm text-muted-foreground">Shared by Sarah M.</p>
                    </div>
                  </div>
                  <Badge type="expert" size="sm" />
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-secondary mb-1">💡 Best Study Tip</h4>
                    <p className="text-foreground">
                      Practice balancing equations every single day, even if it's just 5 minutes. Make sure you truly understand stoichiometry before moving on to harder concepts.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-destructive mb-1">⚠️ Biggest Mistake</h4>
                    <p className="text-foreground">
                      I tried to memorize everything without understanding the underlying principles. Chemistry builds on itself!
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 text-accent" />
                      <span>28 upvotes</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MessageCircle className="w-4 h-4" />
                      <span>12 comments</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Join the Community?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Whether you're looking for guidance or ready to share your knowledge, SeniorWise is here to help you succeed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg" 
              className="gap-2"
              onClick={() => navigate('/browse')}
            >
              <BookOpen className="w-5 h-5" />
              Start Browsing Advice
            </Button>
            <Button 
              variant="accent" 
              size="lg" 
              className="gap-2"
              onClick={() => navigate('/share')}
            >
              <Star className="w-5 h-5" />
              Share Your First Tip
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

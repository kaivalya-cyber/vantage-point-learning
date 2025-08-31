import { useState } from "react";
import { Header } from "@/components/Header";
import { SubjectBadge, badgeConfig, BadgeType } from "@/components/SubjectBadge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, BookOpen, Clock } from "lucide-react";

const Badges = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const reputationBadges: BadgeType[] = ['beginner', 'contributor', 'expert', 'legend'];
  const subjectBadges: BadgeType[] = [
    'math', 'computer-science', 'science', 'english', 
    'history', 'psychology', 'business', 'art', 
    'engineering', 'languages', 'music'
  ];
  const activityBadges: BadgeType[] = ['college-prep', 'time-management', 'extracurriculars', 'study-tips'];

  const getBadgesByCategory = (category: string) => {
    switch (category) {
      case 'reputation':
        return reputationBadges;
      case 'subjects':
        return subjectBadges;
      case 'activities':
        return activityBadges;
      default:
        return [...reputationBadges, ...subjectBadges, ...activityBadges];
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'reputation':
        return <Trophy className="w-5 h-5" />;
      case 'subjects':
        return <BookOpen className="w-5 h-5" />;
      case 'activities':
        return <Clock className="w-5 h-5" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  const getCategoryDescription = (category: string) => {
    switch (category) {
      case 'reputation':
        return 'Earned through consistent contribution and helping fellow students';
      case 'subjects':
        return 'Specialized expertise in academic subjects and fields of study';
      case 'activities':
        return 'Recognition for guidance in college preparation and student life';
      default:
        return 'All available badges across reputation, subjects, and activities';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Badge Collection</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover all the badges you can earn through mentorship, expertise, and community contribution. 
              Each badge represents a unique achievement in your academic journey.
            </p>
          </div>

          {/* Badge Categories */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                All Badges
              </TabsTrigger>
              <TabsTrigger value="reputation" className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Reputation
              </TabsTrigger>
              <TabsTrigger value="subjects" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Subjects
              </TabsTrigger>
              <TabsTrigger value="activities" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Activities
              </TabsTrigger>
            </TabsList>

            {/* Badge Grid */}
            {['all', 'reputation', 'subjects', 'activities'].map((category) => (
              <TabsContent key={category} value={category}>
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    {getCategoryIcon(category)}
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        {category === 'all' ? 'All Badges' : 
                         category.charAt(0).toUpperCase() + category.slice(1)} Collection
                      </h2>
                      <p className="text-muted-foreground">
                        {getCategoryDescription(category)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getBadgesByCategory(category).map((badgeType) => {
                    const config = badgeConfig[badgeType];
                    return (
                      <Card key={badgeType} className="bg-gradient-card border-border shadow-card hover:shadow-button transition-smooth">
                        <CardHeader className="pb-4">
                          <div className="flex items-center justify-between">
                            <SubjectBadge type={badgeType} size="lg" showLabel={false} />
                            <Badge variant="outline" className="text-xs">
                              {reputationBadges.includes(badgeType) ? 'Reputation' :
                               subjectBadges.includes(badgeType) ? 'Subject' : 'Activity'}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg">{config.label}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-sm text-muted-foreground">
                            {config.description}
                          </CardDescription>
                          
                          {/* Badge requirements or criteria */}
                          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                            <p className="text-xs text-muted-foreground font-medium mb-1">How to earn:</p>
                            <p className="text-xs text-muted-foreground">
                              {reputationBadges.includes(badgeType) ? 
                                `Reach ${badgeType === 'beginner' ? '10' : badgeType === 'contributor' ? '100' : badgeType === 'expert' ? '500' : '1000'} reputation points` :
                                subjectBadges.includes(badgeType) ?
                                'Answer 5+ questions and receive 10+ upvotes in this subject' :
                                'Complete activities and help students in this area'
                              }
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Achievement Stats */}
          <div className="mt-12 bg-gradient-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Badge Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{reputationBadges.length}</div>
                <div className="text-sm text-muted-foreground">Reputation Badges</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">{subjectBadges.length}</div>
                <div className="text-sm text-muted-foreground">Subject Badges</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{activityBadges.length}</div>
                <div className="text-sm text-muted-foreground">Activity Badges</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{reputationBadges.length + subjectBadges.length + activityBadges.length}</div>
                <div className="text-sm text-muted-foreground">Total Badges</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Badges;
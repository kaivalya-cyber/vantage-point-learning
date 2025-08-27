import { useState } from "react";
import { Header } from "@/components/Header";
import { EnhancedAdviceCard } from "@/components/EnhancedAdviceCard";
import { SearchFilters } from "@/components/SearchFilters";
import { LeaderboardCard } from "@/components/LeaderboardCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdvice } from "@/hooks/useAdvice";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { Loader2, TrendingUp } from "lucide-react";
import { toast } from "sonner";

export default function Browse() {
  const { advice, loading: adviceLoading, handleUpvote } = useAdvice();
  const { users, loading: leaderboardLoading } = useLeaderboard();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const handleComment = (id: string) => {
    toast.info('Comment functionality coming soon!');
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredAdvice = advice.filter(item => {
    const matchesSearch = 
      item.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.study_tip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => item.tags?.includes(tag));
      
    const matchesDifficulty = difficulty === 'all' || 
      item.difficulty_rating === difficulty;
    
    return matchesSearch && matchesTags && matchesDifficulty;
  }).sort((a, b) => {
    if (sortBy === 'popular') return b.upvotes - a.upvotes;
    if (sortBy === 'helpful') return (b.profiles?.reputation || 0) - (a.profiles?.reputation || 0);
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Browse & Discover</h1>
          <p className="text-muted-foreground mb-6">
            Explore helpful advice from top students and see who's leading the community.
          </p>
        </div>

        <Tabs defaultValue="advice" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="advice">Student Advice</TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Leaderboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="advice" className="space-y-6">
            <SearchFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
              difficulty={difficulty}
              onDifficultyChange={setDifficulty}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            {adviceLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid gap-6 max-w-4xl mx-auto">
                {filteredAdvice.map((item) => (
                  <EnhancedAdviceCard
                    key={item.id}
                    {...item}
                    onUpvote={handleUpvote}
                    onComment={handleComment}
                  />
                ))}
              </div>
            )}

            {!adviceLoading && filteredAdvice.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No advice found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4" 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedTags([]);
                    setDifficulty('all');
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="leaderboard">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent>
                {leaderboardLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {users.slice(0, 10).map((user, index) => (
                      <LeaderboardCard
                        key={user.id}
                        user={user}
                        rank={index + 1}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
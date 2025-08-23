import { useState } from "react";
import { Header } from "@/components/Header";
import { AdviceCard } from "@/components/AdviceCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

// Mock data for demonstration
const mockAdvice = [
  {
    id: '1',
    course: 'AP Calculus',
    studyTip: 'Practice derivatives daily for 15 minutes. Use Khan Academy for extra practice problems.',
    mistake: 'Not understanding the concept before memorizing formulas. Learn WHY calculus works.',
    resources: 'Khan Academy, Professor Leonard YouTube channel, and study groups',
    author: 'Sarah M.',
    isAnonymous: false,
    upvotes: 24,
    comments: 8
  },
  {
    id: '2',
    course: 'AP Biology',
    studyTip: 'Make flashcards for all vocabulary and review them before bed. Draw diagrams.',
    mistake: 'Trying to memorize everything without understanding processes and connections.',
    resources: 'Crash Course Biology, Bozeman Science, and lab partner study sessions',
    author: 'Anonymous',
    isAnonymous: true,
    upvotes: 18,
    comments: 5
  },
  {
    id: '3',
    course: 'AP Chemistry',
    studyTip: 'Balance equations daily and understand stoichiometry thoroughly. It\'s the foundation.',
    mistake: 'Skipping practice problems and only reading the textbook.',
    resources: 'ChemGuy videos, practice AP exams, and teacher office hours',
    author: 'Mike Chen',
    isAnonymous: false,
    upvotes: 31,
    comments: 12
  }
];

export default function Browse() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [advice, setAdvice] = useState(mockAdvice);

  const handleUpvote = (id: string) => {
    setAdvice(prev => prev.map(item => 
      item.id === id ? { ...item, upvotes: item.upvotes + 1 } : item
    ));
  };

  const handleComment = (id: string) => {
    console.log('Comment on advice:', id);
  };

  const filteredAdvice = advice.filter(item => {
    const matchesSearch = item.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.studyTip.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterBy === 'all') return matchesSearch;
    if (filterBy === 'popular') return matchesSearch && item.upvotes > 20;
    if (filterBy === 'recent') return matchesSearch; // Would filter by date in real app
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filter Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Browse Student Advice</h1>
          <p className="text-muted-foreground mb-6">
            Discover helpful tips and insights from senior students who've walked the path before you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses, tips, or subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Advice</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Advice Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 max-w-4xl mx-auto">
          {filteredAdvice.map((item) => (
            <AdviceCard
              key={item.id}
              {...item}
              onUpvote={handleUpvote}
              onComment={handleComment}
            />
          ))}
        </div>

        {filteredAdvice.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No advice found matching your search.</p>
            <Button variant="outline" className="mt-4" onClick={() => setSearchTerm('')}>
              Clear Search
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
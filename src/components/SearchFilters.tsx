import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";

interface SearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  difficulty: string;
  onDifficultyChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

const COMMON_TAGS = [
  'Math', 'Science', 'English', 'History', 'Computer Science',
  'Physics', 'Chemistry', 'Biology', 'AP', 'SAT', 'Study Tips',
  'Time Management', 'Test Prep', 'College Prep'
];

export const SearchFilters = ({
  searchTerm,
  onSearchChange,
  selectedTags,
  onTagToggle,
  difficulty,
  onDifficultyChange,
  sortBy,
  onSortChange
}: SearchFiltersProps) => {
  const [showAllTags, setShowAllTags] = useState(false);

  const displayedTags = showAllTags ? COMMON_TAGS : COMMON_TAGS.slice(0, 8);

  return (
    <div className="space-y-4">
      {/* Search and Sort Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses, tips, or subjects..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="helpful">Most Helpful</SelectItem>
            </SelectContent>
          </Select>

          <Select value={difficulty} onValueChange={onDifficultyChange}>
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tags Filter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-foreground">Filter by tags:</h4>
          {selectedTags.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => selectedTags.forEach(onTagToggle)}
              className="text-xs"
            >
              Clear all
            </Button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {displayedTags.map(tag => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer transition-smooth hover:bg-primary/20"
              onClick={() => onTagToggle(tag)}
            >
              {tag}
              {selectedTags.includes(tag) && (
                <X className="w-3 h-3 ml-1" />
              )}
            </Badge>
          ))}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAllTags(!showAllTags)}
            className="text-xs px-2 py-1 h-auto"
          >
            {showAllTags ? 'Show less' : 'Show more tags'}
          </Button>
        </div>
      </div>

      {/* Active filters indicator */}
      {(selectedTags.length > 0 || difficulty !== 'all') && (
        <div className="text-sm text-muted-foreground">
          Showing results with {selectedTags.length > 0 && `${selectedTags.length} tag filter${selectedTags.length > 1 ? 's' : ''}`}
          {selectedTags.length > 0 && difficulty !== 'all' && ' and '}
          {difficulty !== 'all' && `${difficulty} difficulty`}
        </div>
      )}
    </div>
  );
};
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { MessageCircle, Plus, ChevronUp, Clock, User, BookOpen } from 'lucide-react';

interface Question {
  id: string;
  title: string;
  content: string;
  category: string;
  status: 'open' | 'answered' | 'closed';
  upvotes: number;
  created_at: string;
  asker_id: string;
  profiles: {
    display_name: string;
    role: string;
    college: string;
  };
  question_answers: {
    id: string;
    content: string;
    upvotes: number;
    is_accepted: boolean;
    created_at: string;
    answerer_id: string;
    profiles: {
      display_name: string;
      role: string;
      college: string;
    };
  }[];
}

const Questions = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [newQuestion, setNewQuestion] = useState({
    title: '',
    content: '',
    category: '',
  });

  const [newAnswer, setNewAnswer] = useState('');
  const [answeringQuestion, setAnsweringQuestion] = useState<string | null>(null);

  const categories = [
    'Academic', 'College Prep', 'Extracurriculars', 'Sports', 
    'Study Tips', 'Time Management', 'Career', 'Social', 'General'
  ];

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select(`
          *,
          profiles!questions_asker_id_fkey(display_name, role, college),
          question_answers(
            id, content, upvotes, is_accepted, created_at, answerer_id,
            profiles!question_answers_answerer_id_fkey(display_name, role, college)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuestions(data || []);
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch questions.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const { error } = await supabase
        .from('questions')
        .insert({
          title: newQuestion.title,
          content: newQuestion.content,
          category: newQuestion.category,
          asker_id: user.id,
        });

      if (error) throw error;

      setNewQuestion({ title: '', content: '', category: '' });
      setIsDialogOpen(false);
      fetchQuestions();
      toast({
        title: "Question Posted!",
        description: "Your question has been posted successfully.",
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to post question.",
      });
    }
  };

  const handleSubmitAnswer = async (questionId: string) => {
    if (!user || !newAnswer.trim()) return;

    try {
      const { error } = await supabase
        .from('question_answers')
        .insert({
          question_id: questionId,
          content: newAnswer,
          answerer_id: user.id,
        });

      if (error) throw error;

      setNewAnswer('');
      setAnsweringQuestion(null);
      fetchQuestions();
      toast({
        title: "Answer Posted!",
        description: "Your answer has been posted successfully.",
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to post answer.",
      });
    }
  };

  const handleUpvoteQuestion = async (questionId: string) => {
    if (!user) return;

    try {
      const question = questions.find(q => q.id === questionId);
      if (!question) return;

      const { error } = await supabase
        .from('questions')
        .update({ upvotes: question.upvotes + 1 })
        .eq('id', questionId);

      if (error) throw error;
      fetchQuestions();
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upvote question.",
      });
    }
  };

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || question.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || question.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Questions & Answers</h1>
            <p className="text-muted-foreground">Ask questions and get answers from experienced students</p>
          </div>
          
          {user && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Ask Question
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Ask a Question</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmitQuestion} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="question-title">Title</Label>
                    <Input
                      id="question-title"
                      value={newQuestion.title}
                      onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                      placeholder="What's your question about?"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="question-category">Category</Label>
                    <Select 
                      value={newQuestion.category} 
                      onValueChange={(value) => setNewQuestion({ ...newQuestion, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="question-content">Details</Label>
                    <Textarea
                      id="question-content"
                      value={newQuestion.content}
                      onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
                      placeholder="Provide more details about your question..."
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Post Question</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:max-w-sm"
          />
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="md:w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="md:w-48">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="answered">Answered</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 animate-pulse" />
              <p className="text-muted-foreground">Loading questions...</p>
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No questions found matching your criteria.</p>
            </div>
          ) : (
            filteredQuestions.map((question) => (
              <Card key={question.id} className="bg-gradient-card shadow-card">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Question Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{question.category}</Badge>
                          <Badge 
                            variant={
                              question.status === 'open' ? 'default' :
                              question.status === 'answered' ? 'secondary' : 'outline'
                            }
                          >
                            {question.status}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">{question.title}</h3>
                        <p className="text-muted-foreground mb-3">{question.content}</p>
                        
                        {/* Question Meta */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{question.profiles.display_name}</span>
                            <Badge variant="outline" className="text-xs ml-1">
                              {question.profiles.role}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(question.created_at).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{question.profiles.college || 'School not specified'}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Upvote Button */}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleUpvoteQuestion(question.id)}
                        disabled={!user}
                        className="flex flex-col items-center gap-1"
                      >
                        <ChevronUp className="w-4 h-4" />
                        <span className="text-xs">{question.upvotes}</span>
                      </Button>
                    </div>

                    {/* Answers */}
                    {question.question_answers.length > 0 && (
                      <div className="space-y-3 border-t border-border pt-4">
                        <h4 className="font-medium text-foreground">Answers ({question.question_answers.length})</h4>
                        {question.question_answers.map((answer) => (
                          <div key={answer.id} className="bg-muted/30 rounded-lg p-4">
                            <p className="text-foreground mb-2">{answer.content}</p>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  <span>{answer.profiles.display_name}</span>
                                  <Badge variant="outline" className="text-xs ml-1">
                                    {answer.profiles.role}
                                  </Badge>
                                </div>
                                <span>{new Date(answer.created_at).toLocaleDateString()}</span>
                              </div>
                              {answer.is_accepted && (
                                <Badge variant="secondary" className="text-xs">Accepted Answer</Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Answer Form */}
                    {user && (
                      <div className="border-t border-border pt-4">
                        {answeringQuestion === question.id ? (
                          <div className="space-y-3">
                            <Textarea
                              value={newAnswer}
                              onChange={(e) => setNewAnswer(e.target.value)}
                              placeholder="Write your answer..."
                              rows={3}
                            />
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setAnsweringQuestion(null)}
                              >
                                Cancel
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handleSubmitAnswer(question.id)}
                                disabled={!newAnswer.trim()}
                              >
                                Post Answer
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setAnsweringQuestion(question.id)}
                          >
                            Answer Question
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Questions;
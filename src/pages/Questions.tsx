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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { MessageCircle, Plus, ChevronUp, Clock, User, BookOpen, Award, ThumbsUp, Star } from 'lucide-react';
import { toast } from 'sonner';

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
    reputation: number;
  } | null;
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
      reputation: number;
    } | null;
  }[];
}

const Questions = () => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [newQuestion, setNewQuestion] = useState({
    title: '',
    content: '',
    category: '',
  });

  const [newAnswer, setNewAnswer] = useState('');
  const [answeringQuestion, setAnsweringQuestion] = useState<string | null>(null);

  const categories = [
    'Sports', 'Academic', 'Extracurriculars', 'College Prep', 
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
          profiles(display_name, role, college, reputation),
          question_answers(
            id, content, upvotes, is_accepted, created_at, answerer_id,
            profiles(display_name, role, college, reputation)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuestions((data as any) || []);
    } catch (err: any) {
      toast.error("Failed to fetch questions");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to ask a question");
      return;
    }

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
      toast.success("Your question has been posted successfully!");
    } catch (err: any) {
      toast.error("Failed to post question");
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
      toast.success("Your answer has been posted successfully!");
    } catch (err: any) {
      toast.error("Failed to post answer");
    }
  };

  const handleUpvoteQuestion = async (questionId: string) => {
    if (!user) {
      toast.error("Please log in to upvote questions");
      return;
    }

    try {
      // Check if user already upvoted this question
      const { data: existingUpvote } = await supabase
        .from('question_upvotes')
        .select('id')
        .eq('question_id', questionId)
        .eq('user_id', user.id)
        .single();

      if (existingUpvote) {
        // Remove upvote
        await supabase
          .from('question_upvotes')
          .delete()
          .eq('question_id', questionId)
          .eq('user_id', user.id);
        toast.success("Upvote removed");
      } else {
        // Add upvote
        await supabase
          .from('question_upvotes')
          .insert({ question_id: questionId, user_id: user.id });
        toast.success("Question upvoted!");
      }

      fetchQuestions(); // Refresh to get updated counts
    } catch (error) {
      console.error('Error upvoting question:', error);
      toast.error("Failed to upvote question");
    }
  };

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || question.category === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const getTabQuestions = (category: string) => {
    return questions.filter(q => category === 'all' || q.category === category);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Questions & Answers</h1>
            <p className="text-muted-foreground">Ask questions and get answers from experienced students</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2" size="lg">
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
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Tabbed Categories */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 mb-6">
            <TabsTrigger value="all" className="text-xs px-2">
              All
              <Badge variant="secondary" className="ml-1 text-xs">
                {questions.length}
              </Badge>
            </TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="text-xs px-2">
                {category === 'College Prep' ? 'Prep' : 
                 category === 'Time Management' ? 'Time' :
                 category === 'Extracurriculars' ? 'Extra' :
                 category === 'Study Tips' ? 'Study' : category}
                <Badge variant="secondary" className="ml-1 text-xs">
                  {getTabQuestions(category).length}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="space-y-6">
              {loading ? (
                <div className="text-center py-12">
                  <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 animate-pulse" />
                  <p className="text-muted-foreground">Loading questions...</p>
                </div>
              ) : filteredQuestions.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">
                    {activeTab === 'all' ? 'No questions found matching your search.' : `No questions in ${activeTab} category.`}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">Be the first to ask a question!</p>
                  <Button onClick={() => setIsDialogOpen(true)} variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Ask the First Question
                  </Button>
                </div>
              ) : (
                filteredQuestions.map((question) => (
                  <Card key={question.id} className="bg-gradient-card shadow-card hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Question Header */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary">{question.category}</Badge>
                              <Badge 
                                variant={
                                  question.status === 'open' ? 'outline' :
                                  question.status === 'answered' ? 'default' : 'secondary'
                                }
                              >
                                {question.status === 'answered' && <Award className="w-3 h-3 mr-1" />}
                                {question.status}
                              </Badge>
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-2 hover:text-primary cursor-pointer">
                              {question.title}
                            </h3>
                            <p className="text-muted-foreground mb-3 line-clamp-2">{question.content}</p>
                            
                            {/* Question Meta */}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                <span>{question.profiles?.display_name || 'Anonymous'}</span>
                                <Badge variant="outline" className="text-xs ml-1">
                                  {question.profiles?.role || 'Student'}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{new Date(question.created_at).toLocaleDateString()}</span>
                              </div>
                              {question.profiles?.college && (
                                <div className="flex items-center gap-1">
                                  <BookOpen className="w-4 h-4" />
                                  <span>{question.profiles.college}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <MessageCircle className="w-4 h-4" />
                                <span>{question.question_answers.length} answers</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Upvote Button */}
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleUpvoteQuestion(question.id)}
                            className="flex flex-col items-center gap-1 min-w-[60px]"
                          >
                            <ChevronUp className="w-4 h-4" />
                            <span className="text-xs font-semibold">{question.upvotes}</span>
                          </Button>
                        </div>

                        {/* Answers */}
                        {question.question_answers.length > 0 && (
                          <div className="space-y-3 border-t border-border pt-4">
                            <h4 className="font-medium text-foreground flex items-center gap-2">
                              <MessageCircle className="w-4 h-4" />
                              Answers ({question.question_answers.length})
                            </h4>
                            {question.question_answers.slice(0, 2).map((answer) => (
                              <div key={answer.id} className="bg-muted/30 rounded-lg p-4 border-l-4 border-l-primary/50">
                                <p className="text-foreground mb-2">{answer.content}</p>
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                  <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                      <User className="w-3 h-3" />
                                      <span>{answer.profiles?.display_name || 'Anonymous'}</span>
                                      <Badge variant="outline" className="text-xs ml-1">
                                        {answer.profiles?.role || 'Student'}
                                      </Badge>
                                    </div>
                                    <span>{new Date(answer.created_at).toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {answer.is_accepted && (
                                      <Badge variant="default" className="text-xs">
                                        <Award className="w-3 h-3 mr-1" />
                                        Accepted
                                      </Badge>
                                    )}
                                    <span className="flex items-center gap-1">
                                      <ChevronUp className="w-3 h-3" />
                                      {answer.upvotes}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                            {question.question_answers.length > 2 && (
                              <Button variant="link" size="sm" className="text-xs">
                                View {question.question_answers.length - 2} more answers
                              </Button>
                            )}
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
                                    onClick={() => {
                                      setAnsweringQuestion(null);
                                      setNewAnswer('');
                                    }}
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
                                className="gap-2"
                              >
                                <MessageCircle className="w-4 h-4" />
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Questions;
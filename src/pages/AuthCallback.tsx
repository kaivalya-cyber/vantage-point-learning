import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { GraduationCap, Loader2 } from 'lucide-react';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [needsRoleSelection, setNeedsRoleSelection] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth error:', error);
          toast({
            variant: "destructive",
            title: "Authentication Error",
            description: error.message,
          });
          navigate('/auth');
          return;
        }

        if (data.session?.user) {
          setUser(data.session.user);
          
          // Check if user already has a profile with role
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('user_id', data.session.user.id)
            .single();

          if (profileError || !profile?.role) {
            // User needs to select a role
            setNeedsRoleSelection(true);
            setLoading(false);
          } else {
            // User already has a role, redirect to home
            toast({
              title: "Welcome back!",
              description: "You've successfully signed in with Google.",
            });
            navigate('/');
          }
        } else {
          navigate('/auth');
        }
      } catch (err) {
        console.error('Callback error:', err);
        navigate('/auth');
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  const handleRoleSelection = async () => {
    if (!selectedRole || !user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          email: user.email,
          display_name: user.user_metadata?.full_name || user.email,
          role: selectedRole as 'freshman' | 'senior' | 'alumni',
        });

      if (error) throw error;

      toast({
        title: "Profile Setup Complete!",
        description: "Welcome to SeniorWise!",
      });
      navigate('/');
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !needsRoleSelection) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Setting up your account...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (needsRoleSelection) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gradient-card shadow-card">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4 mx-auto">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
            <CardDescription>
              Help us personalize your experience by selecting your academic status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="role-select">Academic Status</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your academic status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="freshman">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Freshman</span>
                      <span className="text-xs text-muted-foreground">Just starting college journey</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="senior">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Senior</span>
                      <span className="text-xs text-muted-foreground">Final year or upperclassman</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="alumni">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Alumni</span>
                      <span className="text-xs text-muted-foreground">Graduated and working</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground">
              <p><strong>Why do we ask?</strong></p>
              <ul className="mt-2 space-y-1 text-xs">
                <li>• <strong>Freshmen:</strong> Get advice from seniors and alumni</li>
                <li>• <strong>Seniors:</strong> Share knowledge and mentor freshmen</li>
                <li>• <strong>Alumni:</strong> Provide career guidance and life advice</li>
              </ul>
            </div>

            <Button 
              onClick={handleRoleSelection} 
              className="w-full" 
              disabled={!selectedRole || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Setting up...
                </>
              ) : (
                'Continue to SeniorWise'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

export default AuthCallback;
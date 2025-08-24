import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';
import { GraduationCap, Plus, X, User, BookOpen, Trophy, Calendar } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { profile, loading, updateProfile } = useProfile();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const isSetup = searchParams.get('setup') === 'true';

  const [formData, setFormData] = useState({
    display_name: '',
    role: 'freshman' as 'freshman' | 'senior' | 'alumni',
    college: '',
    graduation_year: new Date().getFullYear(),
    major: '',
    bio: '',
    certifications: [] as string[],
    extracurriculars: [] as string[],
    sports: [] as string[],
  });

  const [newItems, setNewItems] = useState({
    certification: '',
    extracurricular: '',
    sport: '',
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        display_name: profile.display_name || '',
        role: profile.role,
        college: profile.college || '',
        graduation_year: profile.graduation_year || new Date().getFullYear(),
        major: profile.major || '',
        bio: profile.bio || '',
        certifications: profile.certifications || [],
        extracurriculars: profile.extracurriculars || [],
        sports: profile.sports || [],
      });
    }
  }, [profile]);

  const addItem = (type: 'certification' | 'extracurricular' | 'sport') => {
    const value = newItems[type].trim();
    const arrayField = `${type}s` as 'certifications' | 'extracurriculars' | 'sports';
    if (value && !(formData[arrayField] as string[]).includes(value)) {
      setFormData({
        ...formData,
        [arrayField]: [...(formData[arrayField] as string[]), value],
      });
      setNewItems({ ...newItems, [type]: '' });
    }
  };

  const removeItem = (type: 'certifications' | 'extracurriculars' | 'sports', index: number) => {
    const items = [...(formData[type] as string[])];
    items.splice(index, 1);
    setFormData({ ...formData, [type]: items });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await updateProfile(formData);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Update Failed",
          description: error,
        });
      } else {
        toast({
          title: "Profile Updated!",
          description: "Your profile has been successfully updated.",
        });
        if (isSetup) {
          navigate('/');
        }
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {!isSetup && <Header />}
      
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto bg-gradient-card shadow-card">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">
                  {isSetup ? 'Complete Your Profile' : 'Edit Profile'}
                </CardTitle>
                <CardDescription>
                  {isSetup 
                    ? 'Tell us about yourself to connect with the right mentors and mentees'
                    : 'Update your information and preferences'
                  }
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="display-name">Display Name</Label>
                  <Input
                    id="display-name"
                    value={formData.display_name}
                    onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                    placeholder="How should others see your name?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select 
                    value={formData.role} 
                    onValueChange={(value: 'freshman' | 'senior' | 'alumni') => 
                      setFormData({ ...formData, role: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="freshman">Freshman</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                      <SelectItem value="alumni">Alumni</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="college">College/School</Label>
                  <Input
                    id="college"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    placeholder="Your school or university"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="graduation-year">Graduation Year</Label>
                  <Input
                    id="graduation-year"
                    type="number"
                    min="2020"
                    max="2030"
                    value={formData.graduation_year}
                    onChange={(e) => setFormData({ ...formData, graduation_year: parseInt(e.target.value) })}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="major">Major/Field of Study</Label>
                  <Input
                    id="major"
                    value={formData.major}
                    onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                    placeholder="Computer Science, Biology, etc."
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell others about yourself, your interests, and what you're passionate about..."
                  rows={4}
                />
              </div>

              {/* Certifications */}
              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-accent" />
                  Certifications
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={newItems.certification}
                    onChange={(e) => setNewItems({ ...newItems, certification: e.target.value })}
                    placeholder="Add a certification"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('certification'))}
                  />
                  <Button type="button" variant="outline" onClick={() => addItem('certification')}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.certifications.map((cert, index) => (
                    <Badge key={index} variant="secondary" className="gap-2">
                      {cert}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => removeItem('certifications', index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Extracurriculars */}
              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-secondary" />
                  Extracurricular Activities
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={newItems.extracurricular}
                    onChange={(e) => setNewItems({ ...newItems, extracurricular: e.target.value })}
                    placeholder="Add an activity"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('extracurricular'))}
                  />
                  <Button type="button" variant="outline" onClick={() => addItem('extracurricular')}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.extracurriculars.map((activity, index) => (
                    <Badge key={index} variant="secondary" className="gap-2">
                      {activity}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => removeItem('extracurriculars', index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Sports */}
              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-primary" />
                  Sports
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={newItems.sport}
                    onChange={(e) => setNewItems({ ...newItems, sport: e.target.value })}
                    placeholder="Add a sport"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('sport'))}
                  />
                  <Button type="button" variant="outline" onClick={() => addItem('sport')}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.sports.map((sport, index) => (
                    <Badge key={index} variant="secondary" className="gap-2">
                      {sport}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => removeItem('sports', index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4 pt-6">
                {!isSetup && (
                  <Button variant="outline" onClick={() => navigate(-1)}>
                    Cancel
                  </Button>
                )}
                <Button type="submit" disabled={saving}>
                  {saving ? 'Saving...' : isSetup ? 'Complete Setup' : 'Update Profile'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
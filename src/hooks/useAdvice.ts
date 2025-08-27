import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface AdviceWithProfile {
  id: string;
  course: string;
  study_tip: string;
  mistake: string | null;
  resources: string | null;
  upvotes: number;
  tags: string[];
  difficulty_rating: string | null;
  is_anonymous: boolean;
  created_at: string;
  author_id: string;
  profiles: {
    display_name: string | null;
    reputation: number;
    badges: string[];
  } | null;
  user_has_upvoted?: boolean;
}

export const useAdvice = () => {
  const { user } = useAuth();
  const [advice, setAdvice] = useState<AdviceWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdvice = async () => {
    try {
      setLoading(true);
      
      // Fetch advice with author profiles
      let query = supabase
        .from('advice')
        .select(`
          id,
          course,
          study_tip,
          mistake,
          resources,
          upvotes,
          tags,
          difficulty_rating,
          is_anonymous,
          created_at,
          author_id,
          profiles!advice_author_id_fkey (
            display_name,
            reputation,
            badges
          )
        `)
        .order('created_at', { ascending: false });

      const { data: adviceData, error: adviceError } = await query;

      if (adviceError) throw adviceError;

      if (user) {
        // Fetch user's upvotes to mark which advice they've upvoted
        const { data: upvotesData } = await supabase
          .from('advice_upvotes')
          .select('advice_id')
          .eq('user_id', user.id);

        const upvotedIds = new Set(upvotesData?.map(uv => uv.advice_id) || []);
        
        const adviceWithUpvotes = adviceData?.map(item => ({
          ...item,
          user_has_upvoted: upvotedIds.has(item.id)
        })) || [];

        setAdvice(adviceWithUpvotes);
      } else {
        setAdvice(adviceData || []);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async (adviceId: string) => {
    if (!user) return { error: 'Please log in to upvote' };

    try {
      const currentAdvice = advice.find(a => a.id === adviceId);
      if (!currentAdvice) return { error: 'Advice not found' };

      if (currentAdvice.user_has_upvoted) {
        // Remove upvote
        await supabase
          .from('advice_upvotes')
          .delete()
          .eq('advice_id', adviceId)
          .eq('user_id', user.id);
      } else {
        // Add upvote
        await supabase
          .from('advice_upvotes')
          .insert({ advice_id: adviceId, user_id: user.id });
      }

      // Refresh the advice list
      fetchAdvice();
      return { error: null };
    } catch (err: any) {
      return { error: err.message };
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, [user]);

  return { advice, loading, error, handleUpvote, refetch: fetchAdvice };
};
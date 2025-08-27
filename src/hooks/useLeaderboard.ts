import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface LeaderboardUser {
  id: string;
  display_name: string | null;
  reputation: number;
  badges: string[];
  total_questions: number;
  total_answers: number;
  helpful_answers: number;
  avatar_url: string | null;
}

export const useLeaderboard = (period: 'all' | 'week' | 'month' = 'all') => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select(`
          id,
          display_name,
          reputation,
          badges,
          total_questions,
          total_answers,
          helpful_answers,
          avatar_url
        `)
        .order('reputation', { ascending: false })
        .limit(50);

      if (fetchError) throw fetchError;
      setUsers(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [period]);

  return { users, loading, error, refetch: fetchLeaderboard };
};
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      advice: {
        Row: {
          author_id: string
          course: string
          created_at: string | null
          difficulty_rating:
            | Database["public"]["Enums"]["difficulty_level"]
            | null
          id: string
          is_anonymous: boolean | null
          mistake: string | null
          resources: string | null
          study_tip: string
          updated_at: string | null
          upvotes: number | null
        }
        Insert: {
          author_id: string
          course: string
          created_at?: string | null
          difficulty_rating?:
            | Database["public"]["Enums"]["difficulty_level"]
            | null
          id?: string
          is_anonymous?: boolean | null
          mistake?: string | null
          resources?: string | null
          study_tip: string
          updated_at?: string | null
          upvotes?: number | null
        }
        Update: {
          author_id?: string
          course?: string
          created_at?: string | null
          difficulty_rating?:
            | Database["public"]["Enums"]["difficulty_level"]
            | null
          id?: string
          is_anonymous?: boolean | null
          mistake?: string | null
          resources?: string | null
          study_tip?: string
          updated_at?: string | null
          upvotes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "advice_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      advice_replies: {
        Row: {
          advice_id: string
          author_id: string
          content: string
          created_at: string | null
          id: string
          upvotes: number | null
        }
        Insert: {
          advice_id: string
          author_id: string
          content: string
          created_at?: string | null
          id?: string
          upvotes?: number | null
        }
        Update: {
          advice_id?: string
          author_id?: string
          content?: string
          created_at?: string | null
          id?: string
          upvotes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "advice_replies_advice_id_fkey"
            columns: ["advice_id"]
            isOneToOne: false
            referencedRelation: "advice"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "advice_replies_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      bookmarks: {
        Row: {
          advice_id: string | null
          created_at: string | null
          id: string
          question_id: string | null
          user_id: string
        }
        Insert: {
          advice_id?: string | null
          created_at?: string | null
          id?: string
          question_id?: string | null
          user_id: string
        }
        Update: {
          advice_id?: string | null
          created_at?: string | null
          id?: string
          question_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_advice_id_fkey"
            columns: ["advice_id"]
            isOneToOne: false
            referencedRelation: "advice"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmarks_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmarks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      course_ratings: {
        Row: {
          course_name: string
          created_at: string | null
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          id: string
          professor: string | null
          rater_id: string
          rating: number | null
          review: string | null
          workload_hours: number | null
        }
        Insert: {
          course_name: string
          created_at?: string | null
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          id?: string
          professor?: string | null
          rater_id: string
          rating?: number | null
          review?: string | null
          workload_hours?: number | null
        }
        Update: {
          course_name?: string
          created_at?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          id?: string
          professor?: string | null
          rater_id?: string
          rating?: number | null
          review?: string | null
          workload_hours?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "course_ratings_rater_id_fkey"
            columns: ["rater_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      mentorship_matches: {
        Row: {
          created_at: string | null
          id: string
          mentee_id: string
          mentor_id: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          mentee_id: string
          mentor_id: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          mentee_id?: string
          mentor_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mentorship_matches_mentee_id_fkey"
            columns: ["mentee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "mentorship_matches_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      notifications: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          read: boolean | null
          recipient_id: string
          related_id: string | null
          title: string
          type: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          read?: boolean | null
          recipient_id: string
          related_id?: string | null
          title: string
          type: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          read?: boolean | null
          recipient_id?: string
          related_id?: string | null
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          certifications: string[] | null
          college: string | null
          created_at: string | null
          display_name: string | null
          email: string | null
          extracurriculars: string[] | null
          graduation_year: number | null
          id: string
          major: string | null
          points: number | null
          role: Database["public"]["Enums"]["user_role"]
          sports: string[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          certifications?: string[] | null
          college?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          extracurriculars?: string[] | null
          graduation_year?: number | null
          id?: string
          major?: string | null
          points?: number | null
          role?: Database["public"]["Enums"]["user_role"]
          sports?: string[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          certifications?: string[] | null
          college?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          extracurriculars?: string[] | null
          graduation_year?: number | null
          id?: string
          major?: string | null
          points?: number | null
          role?: Database["public"]["Enums"]["user_role"]
          sports?: string[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      question_answers: {
        Row: {
          answerer_id: string
          content: string
          created_at: string | null
          id: string
          is_accepted: boolean | null
          question_id: string
          upvotes: number | null
        }
        Insert: {
          answerer_id: string
          content: string
          created_at?: string | null
          id?: string
          is_accepted?: boolean | null
          question_id: string
          upvotes?: number | null
        }
        Update: {
          answerer_id?: string
          content?: string
          created_at?: string | null
          id?: string
          is_accepted?: boolean | null
          question_id?: string
          upvotes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "question_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          asker_id: string
          category: string | null
          content: string
          created_at: string | null
          id: string
          status: Database["public"]["Enums"]["question_status"] | null
          title: string
          updated_at: string | null
          upvotes: number | null
        }
        Insert: {
          asker_id: string
          category?: string | null
          content: string
          created_at?: string | null
          id?: string
          status?: Database["public"]["Enums"]["question_status"] | null
          title: string
          updated_at?: string | null
          upvotes?: number | null
        }
        Update: {
          asker_id?: string
          category?: string | null
          content?: string
          created_at?: string | null
          id?: string
          status?: Database["public"]["Enums"]["question_status"] | null
          title?: string
          updated_at?: string | null
          upvotes?: number | null
        }
        Relationships: []
      }
      scholarships: {
        Row: {
          amount: string | null
          application_url: string | null
          created_at: string | null
          deadline: string | null
          description: string | null
          id: string
          requirements: string | null
          submitted_by: string | null
          title: string
        }
        Insert: {
          amount?: string | null
          application_url?: string | null
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          requirements?: string | null
          submitted_by?: string | null
          title: string
        }
        Update: {
          amount?: string | null
          application_url?: string | null
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          requirements?: string | null
          submitted_by?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "scholarships_submitted_by_fkey"
            columns: ["submitted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      difficulty_level: "easy" | "medium" | "hard"
      question_status: "open" | "answered" | "closed"
      user_role: "freshman" | "senior" | "alumni"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      difficulty_level: ["easy", "medium", "hard"],
      question_status: ["open", "answered", "closed"],
      user_role: ["freshman", "senior", "alumni"],
    },
  },
} as const

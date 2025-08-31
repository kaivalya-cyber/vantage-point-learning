import { Crown, Star, Trophy, Award, Clock, Users, BookOpen, Target } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";

// Badge images
import mathIcon from "@/assets/badges/math.png";
import computerScienceIcon from "@/assets/badges/computer-science.png";
import scienceIcon from "@/assets/badges/science.png";
import englishIcon from "@/assets/badges/english.png";
import historyIcon from "@/assets/badges/history.png";
import psychologyIcon from "@/assets/badges/psychology.png";
import businessIcon from "@/assets/badges/business.png";
import artIcon from "@/assets/badges/art.png";

export type BadgeType = 
  // Reputation-based badges
  | 'beginner'
  | 'contributor' 
  | 'expert'
  | 'legend'
  // Subject-specific badges
  | 'math'
  | 'computer-science'
  | 'science'
  | 'english'
  | 'history'
  | 'psychology'
  | 'business'
  | 'art'
  | 'engineering'
  | 'languages'
  | 'music'
  // Activity-based badges
  | 'college-prep'
  | 'time-management'
  | 'extracurriculars'
  | 'study-tips';

interface BadgeProps {
  type: BadgeType;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

type BadgeConfigItem = {
  color: string;
  label: string;
  description: string;
} & (
  | { icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; image?: never }
  | { image: string; icon?: never }
);

const badgeConfig: Record<BadgeType, BadgeConfigItem> = {
  // Reputation-based badges
  beginner: { 
    icon: Star, 
    color: 'text-accent', 
    label: 'Beginner Mentor',
    description: 'Starting your mentorship journey'
  },
  contributor: { 
    icon: Award, 
    color: 'text-primary', 
    label: 'Active Contributor',
    description: 'Regularly helping fellow students'
  },
  expert: { 
    icon: Trophy, 
    color: 'text-secondary', 
    label: 'Expert Mentor',
    description: 'Recognized for exceptional guidance'
  },
  legend: { 
    icon: Crown, 
    color: 'text-accent', 
    label: 'Legendary Mentor',
    description: 'Elite level of mentorship excellence'
  },
  
  // Subject-specific badges
  math: { 
    image: mathIcon, 
    color: 'text-primary', 
    label: 'Math Expert',
    description: 'Specializes in mathematics and quantitative subjects'
  },
  'computer-science': { 
    image: computerScienceIcon, 
    color: 'text-primary', 
    label: 'CS Expert',
    description: 'Programming and computer science specialist'
  },
  science: { 
    image: scienceIcon, 
    color: 'text-primary', 
    label: 'Science Expert',
    description: 'Expert in natural sciences and research'
  },
  english: { 
    image: englishIcon, 
    color: 'text-primary', 
    label: 'English Expert',
    description: 'Literature and writing specialist'
  },
  history: { 
    image: historyIcon, 
    color: 'text-primary', 
    label: 'History Expert',
    description: 'Historical knowledge and analysis expert'
  },
  psychology: { 
    image: psychologyIcon, 
    color: 'text-primary', 
    label: 'Psychology Expert',
    description: 'Behavioral sciences and mental health specialist'
  },
  business: { 
    image: businessIcon, 
    color: 'text-primary', 
    label: 'Business Expert',
    description: 'Business and economics specialist'
  },
  art: { 
    image: artIcon, 
    color: 'text-primary', 
    label: 'Art Expert',
    description: 'Creative arts and design specialist'
  },
  engineering: { 
    icon: Trophy, 
    color: 'text-secondary', 
    label: 'Engineering Expert',
    description: 'Engineering and technical problem solving'
  },
  languages: { 
    icon: BookOpen, 
    color: 'text-accent', 
    label: 'Languages Expert',
    description: 'Foreign languages and linguistics'
  },
  music: { 
    icon: Star, 
    color: 'text-accent', 
    label: 'Music Expert',
    description: 'Music theory and performance'
  },
  
  // Activity-based badges
  'college-prep': { 
    icon: Target, 
    color: 'text-secondary', 
    label: 'College Prep',
    description: 'College preparation specialist'
  },
  'time-management': { 
    icon: Clock, 
    color: 'text-primary', 
    label: 'Time Management',
    description: 'Productivity and organization expert'
  },
  extracurriculars: { 
    icon: Users, 
    color: 'text-accent', 
    label: 'Extracurriculars',
    description: 'Activities and leadership specialist'
  },
  'study-tips': { 
    icon: BookOpen, 
    color: 'text-secondary', 
    label: 'Study Tips',
    description: 'Effective learning strategies expert'
  }
} as const;

export const SubjectBadge = ({ type, size = 'md', showLabel = true }: BadgeProps) => {
  const config = badgeConfig[type];
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  const containerSizeClasses = {
    sm: 'px-2 py-1',
    md: 'px-3 py-1',
    lg: 'px-4 py-2'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-xs',
    lg: 'text-sm'
  };

  return (
    <div className={`inline-flex items-center gap-2 ${containerSizeClasses[size]} bg-gradient-card rounded-full border border-border shadow-card`}>
      {'image' in config ? (
        <img 
          src={config.image} 
          alt={config.label}
          className={`${sizeClasses[size]} object-contain`}
        />
      ) : 'icon' in config ? (
        <config.icon className={`${sizeClasses[size]} ${config.color}`} />
      ) : null}
      {showLabel && (
        <span className={`${textSizeClasses[size]} font-medium text-foreground`}>
          {config.label}
        </span>
      )}
    </div>
  );
};

export { badgeConfig };
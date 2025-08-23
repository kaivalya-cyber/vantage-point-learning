import { Crown, Star, Trophy, Award } from "lucide-react";

interface BadgeProps {
  type: 'beginner' | 'contributor' | 'expert' | 'legend';
  size?: 'sm' | 'md' | 'lg';
}

const badgeConfig = {
  beginner: { icon: Star, color: 'text-accent', label: 'Beginner Mentor' },
  contributor: { icon: Award, color: 'text-primary', label: 'Active Contributor' },
  expert: { icon: Trophy, color: 'text-secondary', label: 'Expert Mentor' },
  legend: { icon: Crown, color: 'text-accent', label: 'Legendary Mentor' }
};

export const Badge = ({ type, size = 'md' }: BadgeProps) => {
  const config = badgeConfig[type];
  const Icon = config.icon;
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-card rounded-full border border-border shadow-card">
      <Icon className={`${sizeClasses[size]} ${config.color}`} />
      <span className="text-xs font-medium text-foreground">{config.label}</span>
    </div>
  );
};
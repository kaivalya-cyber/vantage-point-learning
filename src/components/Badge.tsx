import { SubjectBadge, BadgeType } from "./SubjectBadge";

interface BadgeProps {
  type: BadgeType;
  size?: 'sm' | 'md' | 'lg';
}

export const Badge = ({ type, size = 'md' }: BadgeProps) => {
  return <SubjectBadge type={type} size={size} showLabel={true} />;
};
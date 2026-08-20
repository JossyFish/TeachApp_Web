import { GraduationCap, BookOpen, Shield } from 'lucide-react';

export type Role = 'student' | 'teacher' | 'admin';

export const ROLES: Record<Role, { 
  label: string; 
  color: string; 
  Icon: React.ElementType;
  translationKey: string; 
}> = {
  student: {
    label: 'Student',
    color: '#2563eb',
    Icon: GraduationCap,
    translationKey: 'roles.student',
  },
  teacher: {
    label: 'Teacher',
    color: '#8b5cf6',
    Icon: BookOpen,
    translationKey: 'roles.teacher',
  },
  admin: {
    label: 'Admin',
    color: '#06b6d4',
    Icon: Shield,
    translationKey: 'roles.admin',
  },
};
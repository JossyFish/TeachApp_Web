
export type PasswordStrength = {
  score: number;       
  label: string;    
  color: string;     
  width: number;    
};

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return { score: 0, label: 'password_empty', color: '#e5e7eb', width: 0 };
  }

  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  score = Math.min(score, 4);

  const map: Record<number, { label: string; color: string; width: number }> = {
    0: { label: 'password_very_weak', color: '#ef4444', width: 15 },
    1: { label: 'password_weak',      color: '#f97316', width: 35 },
    2: { label: 'password_medium',    color: '#eab308', width: 55 },
    3: { label: 'password_strong',    color: '#22c55e', width: 75 },
    4: { label: 'password_very_strong', color: '#16a34a', width: 100 },
  };

  return { score, ...map[score] };
}
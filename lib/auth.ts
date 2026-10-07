import { User } from './types';

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: string;
}

export interface AdminCredentials {
  username: string;
  displayName: string;
  role: 'admin';
}

// Designated Administrator Identity
export const DESIGNATED_ADMIN: AdminCredentials = {
  username: 'othman.mahdi',
  displayName: 'عثمان المهدي',
  role: 'admin'
};

// Password complexity checker
export function validatePasswordStrength(password: string): { isValid: boolean; messageAr: string; messageEn: string } {
  if (password.length < 8) {
    return {
      isValid: false,
      messageAr: 'يجب ألا تقل كلمة المرور عن 8 أحرف.',
      messageEn: 'Password must be at least 8 characters long.'
    };
  }
  if (!/[A-Z]/.test(password) && !/[a-z]/.test(password)) {
    return {
      isValid: false,
      messageAr: 'يجب أن تحتوي كلمة المرور على أحرف إنجليزية.',
      messageEn: 'Password must contain alphabetic characters.'
    };
  }
  if (!/[0-9]/.test(password)) {
    return {
      isValid: false,
      messageAr: 'يجب أن تحتوي كلمة المرور على رقم واحد على الأقل.',
      messageEn: 'Password must contain at least one digit.'
    };
  }
  return { isValid: true, messageAr: 'كلمة مرور قوية', messageEn: 'Strong password' };
}

// In-browser / Client Session Helpers
const SESSION_STORAGE_KEY = 'masaferin_auth_session';

export function getActiveSession(): AuthSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const session: AuthSession = JSON.parse(raw);
    if (new Date(session.expiresAt) < new Date()) {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }
    return session;
  } catch (e) {
    return null;
  }
}

export function setActiveSession(session: AuthSession): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch (e) {
    console.error('Failed to save session:', e);
  }
}

export function clearActiveSession(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear session:', e);
  }
}

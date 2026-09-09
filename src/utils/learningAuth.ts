export type UserRole = 'visitor' | 'admin' | 'owner';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin';
  title: string;
  avatar?: string;
  authenticatedAt: string;
}

const AUTH_STORAGE_KEY = 'algorith_learning_admin_auth_v2';

// Known Authorized Owner & Admin Profiles
export const AUTHORIZED_ACCOUNTS: Record<string, Omit<AdminUser, 'authenticatedAt'>> = {
  owner: {
    id: 'owner-anand-01',
    name: 'Anand (Owner)',
    email: 'anand.analysts@gmail.com',
    role: 'owner',
    title: 'Founder & Lead Architect, ALGorith Technologies',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  admin: {
    id: 'admin-tech-01',
    name: 'ALGorith Administrator',
    email: 'admin@algorith.in',
    role: 'admin',
    title: 'Platform Operations & Technical Content Lead',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  }
};

/**
 * Validates passcodes or emails for Owner / Admin access
 */
export function verifyAdminCredentials(input: string): AdminUser | null {
  const clean = input.trim().toLowerCase();
  
  // 1. Owner checks
  if (
    clean === 'anand.analysts@gmail.com' ||
    clean === 'anand@algorith.in' ||
    clean === 'owner' ||
    clean === 'algorith-owner' ||
    clean === 'anand2026' ||
    clean === 'algorith2026'
  ) {
    const user: AdminUser = {
      ...AUTHORIZED_ACCOUNTS.owner,
      authenticatedAt: new Date().toISOString()
    };
    saveAuthSession(user);
    return user;
  }

  // 2. Admin checks
  if (
    clean === 'admin@algorith.in' ||
    clean === 'contact@algorith.in' ||
    clean === 'admin' ||
    clean === 'algorith-admin' ||
    clean === 'algorith-admin-2026' ||
    clean === 'admin2026'
  ) {
    const user: AdminUser = {
      ...AUTHORIZED_ACCOUNTS.admin,
      authenticatedAt: new Date().toISOString()
    };
    saveAuthSession(user);
    return user;
  }

  return null;
}

/**
 * Retrieves the current verified Admin or Owner session from localStorage
 */
export function getAuthSession(): AdminUser | null {
  try {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!saved) return null;
    const user: AdminUser = JSON.parse(saved);
    if (user && (user.role === 'owner' || user.role === 'admin')) {
      return user;
    }
  } catch {
    // Ignore storage parse errors
  }
  return null;
}

/**
 * Saves authenticated session
 */
export function saveAuthSession(user: AdminUser): void {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  } catch (e) {
    console.warn('Failed to save auth session:', e);
  }
}

/**
 * Clears current admin session
 */
export function clearAuthSession(): void {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    // Ignore
  }
}

/**
 * Quick authorization check
 */
export function isAuthorizedUploader(user: AdminUser | null): boolean {
  if (!user) return false;
  return user.role === 'owner' || user.role === 'admin';
}

export type UserRole = 'SuperAdmin' | 'Admin' | 'Teacher' | 'Student' | 'Parent' | 'Accountant'

export type Permission =
  | 'students:read'
  | 'students:write'
  | 'students:delete'
  | 'exams:read'
  | 'exams:write'
  | 'exams:delete'
  | 'finance:read'
  | 'finance:write'
  | 'finance:delete'
  | 'reports:read'
  | 'settings:read'
  | 'settings:write'
  | 'users:read'
  | 'users:write'

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  SuperAdmin: [
    'students:read', 'students:write', 'students:delete',
    'exams:read', 'exams:write', 'exams:delete',
    'finance:read', 'finance:write', 'finance:delete',
    'reports:read',
    'settings:read', 'settings:write',
    'users:read', 'users:write',
  ],
  Admin: [
    'students:read', 'students:write', 'students:delete',
    'exams:read', 'exams:write',
    'finance:read', 'finance:write',
    'reports:read',
    'settings:read',
    'users:read',
  ],
  Teacher: [
    'students:read',
    'exams:read', 'exams:write',
    'reports:read',
  ],
  Accountant: [
    'students:read',
    'finance:read', 'finance:write',
    'reports:read',
  ],
  Student: [
    'exams:read',
    'finance:read',
  ],
  Parent: [
    'exams:read',
    'finance:read',
  ],
}

export const hasPermission = (role: UserRole, permission: Permission): boolean =>
  ROLE_PERMISSIONS[role]?.includes(permission) ?? false

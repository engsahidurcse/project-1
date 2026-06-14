 /* eslint-disable no-restricted-globals */ // ALLOW LOCALSTORAGE ONLY INSIDE THIS UTILITY MATRIX

/**
 * Restricted Storage Key Allocations
 * Only retaining active keys mapped to our authorization and gatekeeping workflows.
 */
const STORAGE_KEYS = {
  SESSION_FLAG: 'school_erp_session',
} as const;

// ── Secure Session Indicator Handlers (Used across guards and interceptors) ──
export const getSessionCache = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.SESSION_FLAG);
};

export const setSessionCache = (sessionData: string | object): void => {
  const value = typeof sessionData === 'string' ? sessionData : JSON.stringify(sessionData);
  localStorage.setItem(STORAGE_KEYS.SESSION_FLAG, value);
};

export const removeSessionCache = (): void => {
  localStorage.removeItem(STORAGE_KEYS.SESSION_FLAG);
};

// ── System Reset / Security Flush ────────────────────────────────────────
export const clearStorages = (): void => {
  // Complete memory sweep during explicit logouts or system flushes
  localStorage.clear();
  sessionStorage.clear();
};



// const STORAGE_KEYS = {
//   SESSION_FLAG: 'school_erp_session',
//   MENU_ASSIGN: 'assignMenu',
//   STORED_MENU: 'STORAGE_KEY',
//   DEFAULT_COMPANY: 'CompanyData',
//   EMPLOYEE_LIST: 'employeeList',
// } as const;

// // ── Secure Session Indicator Handlers (Used across guards and interceptors) ──
// export const getSessionCache = (): string | null => {
//   return localStorage.getItem(STORAGE_KEYS.SESSION_FLAG);
// };

// export const setSessionCache = (sessionData: string | object): void => {
//   const value = typeof sessionData === 'string' ? sessionData : JSON.stringify(sessionData);
//   localStorage.setItem(STORAGE_KEYS.SESSION_FLAG, value);
// };

// export const removeSessionCache = (): void => {
//   localStorage.removeItem(STORAGE_KEYS.SESSION_FLAG);
// };

// // ── Menu Assignment and Navigation Matrices ──────────────────────────────
// export const getMenuAssign = (): string | null => {
//   return localStorage.getItem(STORAGE_KEYS.MENU_ASSIGN);
// };

// export const setMenuAssign = (menuData: string): void => {
//   localStorage.setItem(STORAGE_KEYS.MENU_ASSIGN, menuData);
// };

// export const getStoredMenu = (): string | null => {
//   return localStorage.getItem(STORAGE_KEYS.STORED_MENU);
// };

// export const setStoredMenu = (menuLayout: string): void => {
//   localStorage.setItem(STORAGE_KEYS.STORED_MENU, menuLayout);
// };

// // ── Default Enterprise / Company Configurations ──────────────────────────
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const getDefaultCom = (): any => {
//   try {
//     return JSON.parse(localStorage.getItem(STORAGE_KEYS.DEFAULT_COMPANY) || "[]");
//   } catch {
//     return [];
//   }
// };

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const setDefaultCom = (companyPayload: any): void => {
//   localStorage.setItem(STORAGE_KEYS.DEFAULT_COMPANY, JSON.stringify(companyPayload));
// };

// // ── Cached Resource Structures (Employee Metadata) ───────────────────────
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const getEmpList = (): any => {
//   try {
//     return JSON.parse(localStorage.getItem(STORAGE_KEYS.EMPLOYEE_LIST) || "[]");
//   } catch {
//     return [];
//   }
// };

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const setEmpList = (employeeData: any): void => {
//   const wrappedPayload = {
//     date: new Date().toISOString(),
//     data: employeeData,
//   };
//   localStorage.setItem(STORAGE_KEYS.EMPLOYEE_LIST, JSON.stringify(wrappedPayload));
// };

// // ── System Reset / Security Flush ────────────────────────────────────────
// export const clearStorages = (): void => {
//   localStorage.clear();
//   sessionStorage.clear();
// };
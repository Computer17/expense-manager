// ===== ইউজার =====
export const getUsers = () => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem('users') || '[]');
};

export const setUsers = (users) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('users', JSON.stringify(users));
};

// ===== লগইন ইউজার =====
export const getLoginUser = () => {
  if (typeof window === 'undefined') return null;
  return JSON.parse(localStorage.getItem('loginUser') || 'null');
};

export const setLoginUser = (user) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('loginUser', JSON.stringify(user));
};

export const clearLoginUser = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('loginUser');
};

// ===== টেবিল =====
export const getTables = (email) => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(email + '_tables') || '[]');
};

export const setTables = (email, tables) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(email + '_tables', JSON.stringify(tables));
};

export const getTableData = (email, tableName) => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(email + '_' + tableName) || '[]');
};

export const setTableData = (email, tableName, data) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(email + '_' + tableName, JSON.stringify(data));
};

export const removeTableData = (email, tableName) => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(email + '_' + tableName);
};

export const getLastTable = (email) => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(email + '_lastTable') || '';
};

export const setLastTable = (email, tableName) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(email + '_lastTable', tableName);
};

// ===== প্রোফাইল =====
export const getUserProfile = (email) => {
  if (typeof window === 'undefined') return null;
  return JSON.parse(localStorage.getItem(email + '_profile') || 'null');
};

export const setUserProfile = (email, profile) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(email + '_profile', JSON.stringify(profile));
};

// ===== থিম =====
export const getTheme = () => {
  if (typeof window === 'undefined') return 'light';
  return localStorage.getItem('theme') || 'light';
};

export const setTheme = (theme) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('theme', theme);
};
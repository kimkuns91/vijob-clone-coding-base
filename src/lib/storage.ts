// 브라우저 환경인지 확인하는 유틸리티 함수
const isBrowser = typeof window !== 'undefined';

// localStorage 래퍼 함수
export const getLocalStorageItem = (key: string) => {
  if (!isBrowser) return null;
  return localStorage.getItem(key);
};

export const setLocalStorageItem = (key: string, value: string) => {
  if (!isBrowser) return;
  localStorage.setItem(key, value);
};

export const removeLocalStorageItem = (key: string) => {
  if (!isBrowser) return;
  localStorage.removeItem(key);
};

// sessionStorage 래퍼 함수
export const getSessionStorageItem = (key: string) => {
  if (!isBrowser) return null;
  return sessionStorage.getItem(key);
};

export const setSessionStorageItem = (key: string, value: string) => {
  if (!isBrowser) return;
  sessionStorage.setItem(key, value);
};

export const removeSessionStorageItem = (key: string) => {
  if (!isBrowser) return;
  sessionStorage.removeItem(key);
}; 
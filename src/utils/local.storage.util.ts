export function setItem(key: string, value: string) {
  return localStorage.setItem(key, value);
}

export function getItem(key: string) {
  return localStorage.getItem(key);
}

export function delItem(key: string) {
  return localStorage.removeItem(key);
}

export function keyExists(key: string) {
  return !!getItem(key);
}

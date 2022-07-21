export function useLocalStorage(key:string) {
  const value = localStorage.getItem(key)
  const set = function(newValue:any) {localStorage.setItem(key, newValue)}
  return {
    value,
    set
  }
} 
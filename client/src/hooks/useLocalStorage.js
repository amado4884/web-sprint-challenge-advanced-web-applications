import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : !initialValue ? null : initialValue;
  });

  const setValue = (value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  const removeValue = () => {
    setStoredValue(null);
    window.localStorage.removeItem(key);
  };

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;

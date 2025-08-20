import { useDebugValue, useEffect, useState } from "react";

export function useLocalStorage(key, initialState) {
  const [state, setState] = useState(initialState);
  useDebugValue(state);

  useEffect(() => {
    const item = localStorage.getItem(key);
    setState(item);
  }, [key]);
  return [state, setState];
}

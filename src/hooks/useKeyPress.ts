import { useEffect, useState } from "react";

export function useKeyPress(allowedKeys: string[]) {
  const [key, setKey] = useState('');

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [key]);


  const handleKeyDown = (event: KeyboardEvent) => {
    if(allowedKeys.includes(event.key)) {
      setKey(event.key);
    }
  };


  return { key, setKey };
}
import { useState, useEffect } from "react";

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Agregamos un listener para estar pendientes de cambios en la media query
    mediaQuery.addEventListener("change", handleChange);

    // Comprobamos la media query cuando el componente se monta
    setMatches(mediaQuery.matches);

    // Limpiamos el listener cuando el componente se desmonta
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;

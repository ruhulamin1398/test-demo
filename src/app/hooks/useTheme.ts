// /app/hooks/useTheme.ts
import { useTheme } from "@/app/context/ThemeContext";

const useThemeToggle = () => {
  const { mode, toggleTheme } = useTheme();
  return { mode, toggleTheme };
};

export default useThemeToggle;

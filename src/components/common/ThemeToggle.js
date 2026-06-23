import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Toggle theme"
      title={theme === 'light' ? 'ডার্ক মোড' : 'লাইট মোড'}
    >
      {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
    </button>
  );
}
import '@/styles/globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { TableProvider } from '@/context/TableContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TableProvider>
          <Component {...pageProps} />
        </TableProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
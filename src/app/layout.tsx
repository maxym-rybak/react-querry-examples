'use client';

import theme from '../theme/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <html lang="en">
          <body>{children}</body>
        </html>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

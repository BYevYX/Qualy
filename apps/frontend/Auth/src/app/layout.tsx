import { Metadata } from 'next';
import './global.css';

export const metadata: Metadata = {
  title: 'Qualy onlain cinema Auth',
  description: 'Login and Signup for Qualy onlain cinema app',
  openGraph: {
    type: 'website',
    siteName: 'Qualy auth',
    title: 'Qualy auth',
    description:
      'Complete Qualy authorization and watch any films, series and more ;)',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black">
        <main>{children}</main>
      </body>
    </html>
  );
}

import AuthToggle from 'src/features/AuthToggle';
import './global.css';

export const metadata = {
  title: 'Auth',
  description: 'Login and Signup',
};

export default function RootLayout({
  children,
  login,
  signup,
}: {
  children: React.ReactNode;
  login: React.ReactNode;
  signup: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex h-full flex-col items-center justify-center bg-blue-400">
          {children}
          <AuthToggle login={login} signup={signup} />
        </main>
      </body>
    </html>
  );
}

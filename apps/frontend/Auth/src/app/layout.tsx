import './global.css';

export const metadata = {
  title: 'Auth',
  description: 'Login and Signup',
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

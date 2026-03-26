import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'N-VITALITY & SOHO | Alta Estética y Cirugía',
  description: 'Tratamientos de élite en cirugía plástica y medicina estética. Donde la ciencia médica se encuentra con la perfección artística.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Variantes itálicas (ital) añadidas para el toque de revista editorial */}
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary selection:text-white transition-colors duration-500">
        {children}
      </body>
    </html>
  );
}
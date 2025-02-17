// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';

export const metadata = {
  title: 'Clariti - Temukan Properti Anda',
  description: 'Properti Website Untuk Rumah Indah Anda',

  openGraph: {
    title: 'Clariti - Temukan Properti Anda',
    description: 'Properti Website Untuk Rumah Indah Anda',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/assets/images/logo-clariti-no-bg.png`, // Large high-res image for sharing
        width: 1200,
        height: 630,
        alt: "Clariti Preview",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <MantineProvider defaultColorScheme="auto">{children}</MantineProvider>
      </body>
    </html>
  );
}
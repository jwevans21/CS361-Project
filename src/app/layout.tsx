import type { Metadata } from 'next';

import '../../styles/globals.css';

import './index.css';

import NoSSR from './components/NoSSR';

export const metadata: Metadata = {
   title: '404 Weather',
   description: 'Weather App for CS361 - Group 404 Name Not Found',
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang='en'>
         <body>
            <NoSSR>{children}</NoSSR>
         </body>
      </html>
   );
}

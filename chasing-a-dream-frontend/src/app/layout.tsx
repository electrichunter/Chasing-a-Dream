import React from 'react';
import Menu from "./component/menu/menu";  // Menü bileşenini içe aktarıyoruz.
import './globals.css';  // Global CSS dosyasını içe aktarıyoruz

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>omer</title>
            </head>
            <body>
                <main>
                    <Menu /> {/* Menü bileşenini burada çağırıyoruz */}
                    {children} {/* Sayfa içeriği burada yer alacak */}

                </main>
            </body>
        </html>
    );
}

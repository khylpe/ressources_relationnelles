// layout.tsx
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
       title: 'Gestion utilisateurs',
};

export default function Layout({
       children,
}: {
       children: React.ReactNode;
}) {
       return (
              <>
                     {children}
              </>
       );
}

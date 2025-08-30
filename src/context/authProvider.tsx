'use client';

import { SessionProvider } from "next-auth/react";
import React, { FC, ReactNode } from "react"

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}

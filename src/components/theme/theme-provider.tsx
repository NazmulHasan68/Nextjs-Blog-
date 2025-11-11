"use client"

import {ThemeProvider as NextThemProvider, ThemeProviderProps } from "next-themes"
import Header from "../layout/header";
import { cn } from "@/lib/utils";

interface ExtendedThemProviderProps extends ThemeProviderProps {
    containerClassName?:string;
}

export default function ThemeProvider({children, containerClassName, ...props} : ExtendedThemProviderProps) {
    return (
        <NextThemProvider {...props}>
            <Header/>
            <main className={cn('content mx-auto px-4', containerClassName)}>
                {children}
            </main>
            {/* Add footer compoent */}
        </NextThemProvider>
    );
}
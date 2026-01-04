"use client";

import React from "react";
import VENav from "./VENav";
import VEFooter from "./VEFooter";

interface VEShellProps {
    children: React.ReactNode;
}

export default function VEShell({ children }: VEShellProps) {
    return (
        <>
            <VENav />
            <main id="main-content">{children}</main>
            <VEFooter />
        </>
    );
}

import type { ReactNode } from "react"
import Sidenav from "./Sidenav";

export default function Main({ children }: { children: ReactNode }) {
    return (
        <>
            <div className="w-full min-h-screen flex bg-gradient-to-br from-indigo-100 via-white to-cyan-100">

                <Sidenav />
                <main className="flex-1 md:p-2 overflow-auto">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
                        {children}
                    </div>
                </main>
            </div>
        </>
    );
}
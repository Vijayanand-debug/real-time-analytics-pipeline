import type { ReactNode } from "react";

export default function Body({ children }: { children: ReactNode }) {
    return (

        <div className="bg-gradient-to-br from-indigo-100 via-white to-cyan-100 min-h-screen flex flex-col items-center justify-start">

            {children}
        </div>

    );
}



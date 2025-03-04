"use Client";
import { ReactNode } from "react"

export const DarkButton = ({ children, onClick,   }: { children: ReactNode, onClick: () => void, size?: "big" | "small" }) => {
    return (
        <div className="cursor-pointer flex justify-center flex-col px-8 py-2 hover:shadow-md bg-purple-600 text-white text-center rounded" onClick={onClick}>
            {children}
        </div>
    )


}
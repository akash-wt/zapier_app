"use Client";
import { ReactNode } from "react"

export const LinkButton = ({ children, onClick }: { children: ReactNode, onClick: () => void }) => {
    return (
        <div className="cursor-pointer" onClick={onClick}>
            {children}
        </div>
    )


}
"use client";
import { useRouter } from "next/navigation";
import { LinkButton } from "./buttons/LinkButton";
import { PrimaryButton } from "./buttons/PrimaryButton";
import { Logo } from "./Logo";

export default function Appbar() {
    const router = useRouter();

    return (
        <div className="flex border-b justify-between p-4 ">

            <div className="flex flex-col justify-center text-2xl font-extrabold">
                <div  className="cursor-pointer" onClick={() => {
                    router.push("/dashboard");
                }}>

                    <Logo />
                </div>
            </div>

            <div className="flex ">
                <div className="pr-4">
                    <LinkButton onClick={() => { }}>Contact Sales</LinkButton>
                </div>
                <div className="pr-4">
                    <LinkButton onClick={() => {
                        router.push("/login")
                    }}>Login</LinkButton>
                </div>
                <PrimaryButton onClick={() => {
                    router.push("/signup")
                }}> Signup</PrimaryButton></div>


        </div>
    );
}

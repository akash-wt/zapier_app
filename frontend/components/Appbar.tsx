"use client";
import { useRouter } from "next/navigation";
import { LinkButton } from "./buttons/LinkButton";
import { PrimaryButton } from "./buttons/PrimaryButton";

export default function Appbar() {
    const router = useRouter();

    return (
        <div className="flex border-b-1 justify-between p-4 ">

            <div className="flex flex-col justify-center">
                Zapier
            </div>

            <div className="flex">
                <div className="">
                    <LinkButton onClick={() => { }}>Contact Sales</LinkButton>
                </div>
                <div className="">
                    <LinkButton onClick={() => {
                        router.push("/login")
                    }}>Login</LinkButton>
                </div>
                <div className=""><PrimaryButton onClick={() => {
                    router.push("/signup")
                }}> Signup</PrimaryButton></div>
            </div>

        </div>
    );
}

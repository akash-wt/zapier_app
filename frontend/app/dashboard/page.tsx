"use client"
import Image from "next/image";
import { DarkButton } from "../../components/buttons/DarkButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL, HOOKS_URL } from "../config";
import { useRouter } from "next/navigation";
import { LinkButton } from "../../components/buttons/LinkButton";



interface Zap {
    "id": string,
    "triggerId": string,
    "userId": number,
    "actions": {
        "id": string,
        "zapId": string,
        "actionId": string,
        "sortingOrder": number,
        "type": {
            "id": string,
            "name": string,
            "image": string
        }
    }[],
    "trigger": {
        "id": string,
        "zapId": string,
        "triggerId": string,
        "type": {
            "id": string,
            "name": string,
            "image": string
        }
    }
}

function useZaps() {
    const [loading, setLoading] = useState(true);
    const [zaps, setZaps] = useState<Zap[]>([]);

    useEffect(() => {

        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        console.log(token);

        axios.get(`${BACKEND_URL}/api/v1/zap`, {
            headers: {
                "Authorization": token
            }
        })
            .then(res => {
                setZaps(res.data.zaps);
                setLoading(false)
                console.log(res);
            })
            .catch(() => { setLoading(false) })



    }, []);

    return {
        loading, zaps
    }
}

export default function Dashboard() {
    const { loading, zaps } = useZaps();
    const router = useRouter();

    return <div>

        <div className="flex justify-center pt-8">
            <div className="max-w-screen-lg	 w-full">
                <div className="flex justify-between pr-8 ">
                    <div className="text-2xl font-bold">
                        My Zaps
                    </div>
                    <DarkButton onClick={() => {
                        router.push("/zap/create");
                    }}>Create</DarkButton>
                </div>
            </div>
        </div>
        {loading ? <div className="text-center mt-20">Loading... </div>: <div className="flex justify-center"> <ZapTable zaps={zaps} /> </div>}
    </div>
}

function ZapTable({ zaps }: { zaps: Zap[] }) {
    const router = useRouter();

    return <div className="p-8 max-w-screen-lg w-full pb-2">
        <div className="flex justify-center text-center">
            <div className="flex-1">Name</div>
            <div className="flex-1">ID</div>
            <div className="flex-1 text-left">Created at</div>
            <div className="flex-1">Webhook URL</div>
            <div className="flex-1">Go</div>
        </div>

        {zaps.map(z => <div key={z.id} className="flex border-b border-t py-4 items-center">

            <div className="flex-1 flex items-center gap-2">
                <img src={z.trigger.type.image} alt="Img" width={30} height={30}  className="rounded-md object-contain" />
                {z.actions.map(x => (
                    <img key={x.id} src={x.type.image} alt="Img" width={30} height={30}  className=" rounded-md object-contain" />
                ))}
            </div>


            <div className="flex-1">{z.id}</div>
            <div className="flex-1 ">Nov 13, 2023</div>
            <div className="flex-1 whitespace-normal break-all">{`${HOOKS_URL}/hooks/catch/1/${z.id}`}</div>
            <div className="flex-1"><LinkButton onClick={() => {
                router.push("/zap/" + z.id)
            }}>Go</LinkButton></div>
        </div>)}


    </div>
}
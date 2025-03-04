"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PrimaryButton } from "../../../components/buttons/PrimaryButton";
import { ZapCell } from "../../../components/ZapCell";


function useAvailableActionsAndTriggers() {
    const [availableActions, setAvailableActions] = useState([]);
    const [availableTriggers, setAvailableTriggers] = useState([]);
    useEffect(() => {

    }, [])

    return {
        availableActions,
        availableTriggers
    }
}

export default function ZapCreate() {
    const router = useRouter();
    const { availableActions, availableTriggers } = useAvailableActionsAndTriggers();

    const [selectedActions, setSelectedActions] = useState<{
        index: number;
        availableActionId: string;
        availableActionName: string;
        metadata: any;
    }[]>([]);

    const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(null);


    return (
        <div>
            <div className="flex justify-end bg-slate-200 p-4">
                <PrimaryButton onClick={
                    () => {
                    }
                }>Publish</PrimaryButton>
            </div >

            <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center ">
                <div className="flex justify-center w-full">
                    <ZapCell onClick={() => { }} name={""} index={1} />
                </div>
                <div className="w-full pt-2 p-b">
                    { }
                </div>
                <div>
                    <PrimaryButton onClick={() => { }}>+</PrimaryButton>
                </div>
            </div>

            
        </div>
    )

}
import React, { useState } from "react";
import { ModalDataInterface } from "../Interfaces/ModalData.interface";


const ModalUI: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    ModalData: ModalDataInterface | undefined;
}> = ({ isOpen, onClose, ModalData }) => {


    const [step, setStep] = useState<number>(1);


    if (!isOpen || !ModalData) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#382B59] w-1/2 p-6 rounded-lg">
                <div className="flex justify-end">
                    <button
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={onClose}
                    >
                        X
                    </button>
                </div>
                <div className="mt-4">
                    {step === 1 && (
                        <div className="flex flex-col items-center justify-center">
                            {ModalData.name}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModalUI;

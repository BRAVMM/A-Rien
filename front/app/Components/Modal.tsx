import React, { use, useEffect, useState } from "react";
import { ModalDataInterface, ServiceActionInterface, ServiceReactionInterface } from "../Interfaces/ModalData.interface";
import AREAForm from "./AREAForm";
import { on } from "events";


const ModalUI: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  ModalData: ModalDataInterface | undefined;
}> = ({ isOpen, onClose, ModalData }) => {



  const [step, setStep] = useState<number>(1);
  const [action, setAction] = useState<ServiceActionInterface>();
  const [actionDatas, setActionDatas] = useState<string>("");
  const [reaction, setReaction] = useState<ServiceReactionInterface>();
  const [reactionDatas, setReactionDatas] = useState<string>("");


  useEffect(() => {
    if (actionDatas !== "") {
      setStep(3);
    }
  }, [actionDatas]);

  useEffect(() => {
    if (reactionDatas !== "") {
      // CALL API TO STORE AREA
      console.log("actionDatas", actionDatas);
      console.log("reactionDatas", reactionDatas);

      onClose();
    }
  }, [reactionDatas]);

  const json: ServiceActionInterface[] = [
    {
      "id": 1,
      "name": "Play a song",
      "args": [
        {
          "title": "Song",
          "type": "string"
        },
      ],
      "reactionIds": [1, 2, 3]
    }
  ];

  if (!isOpen || !ModalData) {
    return null;
  }

  const HTMLselectServiceAction = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        {ModalData.name}
        <div className="flex flex-col items-center justify-center">
          {json.map(action => (
            <div key={action.id}>
              <button
                type="button"
                onClick={() => {
                  setAction(action);
                  setStep(2);
                }
                }
                className={`flex items-center justify-center bg-[#382B59] text-white font-semibold py-2 px-4 rounded-lg w-32 text-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-primary hover:bg-indigo-500 focus-visible:outline-indigo-600`}
              >
                {action.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const HTMLselectServiceDataActionForm = () => {
    return (
      <AREAForm
        fields={action?.args || []}
        setDatas={(data: string) => setActionDatas(data)}
      ></AREAForm>
    );
  }

  const reactionJson: ServiceReactionInterface[] = [
    {
      "id": 1,
      "name": "Send a message",
      "args": [
        {
          "title": "Message",
          "type": "string"
        },
      ],
      actionIds: [1, 2, 3]
    }
  ];


  const HTMLselectReaction = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        {ModalData.name}
        <div className="flex flex-col items-center justify-center">
          {reactionJson.map(reaction => (
            <div key={reaction.id}>
              <button
                type="button"
                onClick={() => {
                  console.log(reaction);
                  setStep(4);
                  setReaction(reaction);
                }
                }
                className={`flex items-center justify-center bg-[#382B59] text-white font-semibold py-2 px-4 rounded-lg w-32 text-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-primary hover:bg-indigo-500 focus-visible:outline-indigo-600`}
              >
                {reaction.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const HTMLselectServiceReactionDataForm = () => {
    return (
      <AREAForm
        fields={reaction?.args || []}
        setDatas={(data: string) => setReactionDatas(data)}
      ></AREAForm>
    );
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
          <div className="flex flex-col items-center justify-center">
            {step === 1 && HTMLselectServiceAction()}
            {step === 2 && HTMLselectServiceDataActionForm()}
            {step === 3 && HTMLselectReaction()}
            {step === 4 && HTMLselectServiceReactionDataForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalUI;

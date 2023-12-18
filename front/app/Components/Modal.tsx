import React, { use, useEffect, useState } from "react";
import { ModalDataInterface, ServiceActionInterface, ServiceReactionInterface } from "../Interfaces/ModalData.interface";
import AREAForm from "./AREAForm";

import actionReactionJsonDataService from "../Utils/actionReactionJsonData.service";


const ModalUI: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  ModalData: ModalDataInterface | undefined;
}> = ({ isOpen, onClose, ModalData }) => {

  enum Step {
    SELECT_SERVICE_ACTION,
    SELECT_SERVICE_ACTION_DATA,
    SELECT_SERVICE_REACTION,
    SELECT_SERVICE_REACTION_DATA,
    VALIDATE_OR_ADD_FORM
  }

  const [actionJsonData, setActionJsonDatas] = useState<ServiceActionInterface[]>();
  const [reactionJsonData, setReactionJsonDatas] = useState<ServiceReactionInterface[]>();
  const [step, setStep] = useState<number>(Step.SELECT_SERVICE_ACTION);
  const [action, setAction] = useState<ServiceActionInterface>();
  const [actionTokenIds, setActionTokenIds] = useState<number[]>();
  const [actionDatas, setActionDatas] = useState<string>("");
  const [reactions, setReactions] = useState<ServiceReactionInterface[]>();
  const [reactionDatas, setReactionDatas] = useState<string[]>();

  if (!isOpen || !ModalData) {
    return null;
  }

  /* Clear functions */
  /**
   * @function clearDatas
   * @description Clear datas when modal is open or close
   * @returns {void}
   */
  const clearDatas = () => {
    setAction(undefined);
    setActionDatas("");
    setReactions(undefined);
    setReactionDatas(undefined);
  }

  /* useEffect */
  /**
   * @function useEffect
   * @description useEffect to clear datas when modal is open
   */
  useEffect(() => {
    if (isOpen) {
      clearDatas();
    }
  }, [isOpen]);

  /**
   * @function useEffect
   * @description useEffect to fetch actionJsonData when ModalData is defined
   */
  useEffect(() => {
    if (ModalData === undefined) {
      console.error("ModalData is undefined");
      return;
    }
    const actionJsonData: Promise<ServiceActionInterface[]> = actionReactionJsonDataService.getActionJsonData(ModalData.id);
    const reactionJsonData: Promise<ServiceReactionInterface[]> = actionReactionJsonDataService.getReactionJsonData(ModalData.id);

    actionJsonData.then((actionJsonData) => {
        setActionJsonDatas(actionJsonData);
    });
    reactionJsonData.then((reactionJsonData) => {
        setReactionJsonDatas(reactionJsonData);
    });

  }, [ModalData]);

  /**
   * @function useEffect
   * @description useEffect to change step when action is defined
   */
  useEffect(() => {
    if (actionDatas !== "") {
      setStep(Step.SELECT_SERVICE_REACTION);
    }
  }, [actionDatas]);

  /**
   * @function useEffect
   * @description useEffect to store area when reactionDatas is defined
   */
  useEffect(() => {
    if (reactionDatas !== undefined) {
      setStep(Step.VALIDATE_OR_ADD_FORM);
    }
  }, [reactionDatas]);

  /* Update functions */
  /**
   * @function updateReaction
   * @param {ServiceReactionInterface} reaction - reaction to store
   */
  const updateReaction = (reaction: ServiceReactionInterface) => {
    const newReaction: ServiceReactionInterface[] = [reaction, ...reactions || []];

    setReactions(newReaction);
  }

  /**
   * @function updateReactionDatas
   * @param {string} data - data to store
   */
  const updateReactionDatas = (data: string) => {
    const newReactionDatas: string[] = [data, ...reactionDatas || []];

    setReactionDatas(newReactionDatas);
  }

  // const actionJson: ServiceActionInterface[] = [
  //   {
  //     "id": 1,
  //     "name": "Play a song",
  //     "args": [
  //       {
  //         "title": "Song",
  //         "type": "string"
  //       },
  //     ],
  //     "reactionIds": [1, 2, 3]
  //   }
  // ];
  //
  // const reactionJson: ServiceReactionInterface[] = [
  //   {
  //     "id": 1,
  //     "name": "Send a message",
  //     "args": [
  //       {
  //         "title": "Message",
  //         "type": "string"
  //       },
  //     ],
  //     actionIds: [1, 2, 3]
  //   }
  // ];

  /**
   * @function HTMLselectServiceAction
   * @description HTML for select Service Action
   * @returns {JSX.Element}
   * @note Step 1
   */
  const HTMLselectServiceAction = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        {ModalData.name}
        <div className="flex flex-col items-center justify-center">
          {actionJsonData?.map(action => (
            <div key={action.id}>
              <button
                type="button"
                onClick={() => {
                  setAction(action);
                  setStep(Step.SELECT_SERVICE_ACTION_DATA)
                }}
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

  /**
   * @function HTMLselectServiceDataActionForm
   * @description HTML for select Service Data Action Form
   * @returns {JSX.Element}
   * @note Step 2
   */
  const HTMLselectServiceDataActionForm = () => {
    return (
      <AREAForm
        fields={action?.args || []}
        setDatas={(data: string) => setActionDatas(data)}
      ></AREAForm>
    );
  }


  /**
   * @function HTMLselectReaction
   * @description HTML for select Reaction
   * @returns {JSX.Element}
   * @note Step 3
   */
  const HTMLselectReaction = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        {ModalData.name}
        <div className="flex flex-col items-center justify-center">
          {reactionJsonData?.map(reaction => (
            <div key={reaction.id}>
              <button
                type="button"
                onClick={() => {
                  setStep(Step.SELECT_SERVICE_REACTION_DATA);
                  updateReaction(reaction);
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

  /**
   * @function HTMLselectServiceReactionDataForm
   * @description HTML for select Service Reaction Data Form
   * @returns {JSX.Element}
   * @note Step 4
   */
  const HTMLselectServiceReactionDataForm = () => {
    return (
      <AREAForm
        fields={reactions?.[0].args || []}
        setDatas={(data: string) => updateReactionDatas(data)}
      ></AREAForm>
    );
  }

  /**
   * @function HTMLvalidateOrAddForm
   * @description HTML for validate or add a new Reaction
   * @returns {JSX.Element}
   * @note Step 5
   */
  const HTMLvalidateOrAddForm = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <button
          onClick={() => setStep(Step.SELECT_SERVICE_REACTION)}
        >
          Add an other reaction
        </button>
        <button
          onClick={() => submitAREA()}
        >
          Submit AREA
        </button>
      </div>
    );
  }

  /* Submit function */
  /**
   * @function submitAREA
   * @description Submit AREA to API and close modal
   */
  const submitAREA = () => {
    // CALL API TO STORE AREA
    console.log("action", action);
    console.log("reactions", reactions);
    console.log("actionDatas", actionDatas);
    console.log("reactionDatas", reactionDatas);
    setStep(Step.SELECT_SERVICE_ACTION);
    clearDatas();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#382B59] w-1/2 p-6 rounded-lg">
        <div className="flex justify-end">
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => {
              setStep(Step.SELECT_SERVICE_ACTION);
              clearDatas();
              onClose();
            }}
          >
            X
          </button>
        </div>
        <div className="mt-4">
          <div className="flex flex-col items-center justify-center">
            {step === Step.SELECT_SERVICE_ACTION && HTMLselectServiceAction()}
            {step === Step.SELECT_SERVICE_ACTION_DATA && HTMLselectServiceDataActionForm()}
            {step === Step.SELECT_SERVICE_REACTION && HTMLselectReaction()}
            {step === Step.SELECT_SERVICE_REACTION_DATA && HTMLselectServiceReactionDataForm()}
            {step === Step.VALIDATE_OR_ADD_FORM && HTMLvalidateOrAddForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalUI;

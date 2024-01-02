import React, { use, useEffect, useState } from "react";
import { ModalDataInterface, ServiceActionInterface, ServiceReactionInterface } from "../Interfaces/ModalData.interface";
import AREAForm from "./AREAForm";

import actionReactionJsonDataService from "../Utils/actionReactionJsonData.service";
import { storeArea } from "@/app/Utils/callApi";


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
    ENTER_AREA_NAME_AND_VALIDATE,
    VALIDATE_OR_ADD_FORM
  }

  const [userId, setUserId] = useState<number>();
  const [isThereAnOauthToken, setIsThereAnOauthToken] = useState<JSX.Element>();
  const [actionJsonData, setActionJsonDatas] = useState<ServiceActionInterface[]>();
  const [reactionJsonData, setReactionJsonDatas] = useState<ServiceReactionInterface[]>();
  const [step, setStep] = useState<number>(Step.SELECT_SERVICE_ACTION);
  const [action, setAction] = useState<ServiceActionInterface>();
  const [actionTokenIds, setActionTokenIds] = useState<number[]>([]);
  const [actionDatas, setActionDatas] = useState<string>("");
  const [reactions, setReactions] = useState<ServiceReactionInterface[]>();
  const [reactionDatas, setReactionDatas] = useState<string[]>();

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
    setIsThereAnOauthToken(undefined);
    setStep(Step.SELECT_SERVICE_ACTION);
  }

  const checkIfThereIsAnOauthToken = async () => {
    if (ModalData === undefined) {
      return;
    }
    const actionTokenIds: number[] = await actionReactionJsonDataService.getOauthIdsFromServiceId(ModalData.id);
    console.log("actionTokenIds", actionTokenIds);
    if (actionTokenIds.length === 0) {
      console.error("Error in checkIfThereIsAnOauthToken: actionTokenIds is empty");
      setIsThereAnOauthToken(
        <div className="flex flex-col items-center justify-center">
          You must be connected to the service to create an AREA
        </div>
      );
    }
  }

  /* useEffect */
  /**
   * @function useEffect
   * @description useEffect to clear datas when modal is open
   */
  useEffect(() => {
    if (isOpen) {
      checkIfThereIsAnOauthToken();
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
    const actionJsonData_: Promise<ServiceActionInterface[]> = actionReactionJsonDataService.getActionJsonData(ModalData.id);

    actionJsonData_.then((actionJsonData_) => {
      setActionJsonDatas(actionJsonData_);
    });
  }, [ModalData]);

  /**
   * @function useEffect
   * @description useEffect to change step when action is defined
   */
  useEffect(() => {
    if (actionDatas !== "") {
      setStep(Step.SELECT_SERVICE_REACTION);
      if (action === undefined) {
        console.error("action is undefined");
        return;
      }
      const reactionDatas = actionReactionJsonDataService.getReactionJsonData(action.id);
      reactionDatas.then((reactionJsonData) => {
        if (reactionJsonData === undefined) {
          console.error("reactionJsonData is undefined");
          return;
        }
        setReactionJsonDatas(reactionJsonData);
      });
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

  if (!isOpen || !ModalData) {
    return null;
  }

  /**
   * @function HTMLselectServiceAction
   * @description HTML for select Service Action
   * @returns {JSX.Element}
   * @note Step 1
   */
  const HTMLselectServiceAction = () => {

    if (isThereAnOauthToken) {
      return isThereAnOauthToken;
    }
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
    if (action?.args.length === 0) {
      if (action === undefined) {
        console.error("action is undefined");
        return;
      }
      const reactionDatas = actionReactionJsonDataService.getReactionJsonData(action.id);
      reactionDatas.then((reactionJsonData) => {
        if (reactionJsonData === undefined) {
          console.error("reactionJsonData is undefined");
          return;
        }
        setActionDatas("[]");
        setReactionJsonDatas(reactionJsonData);
        setStep(Step.SELECT_SERVICE_REACTION);
      });
    }

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
    if (reactions?.[0].args.length === 0) {
      setStep(Step.VALIDATE_OR_ADD_FORM);
      updateReactionDatas("[]");
    }

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
          onClick={() => setStep(Step.ENTER_AREA_NAME_AND_VALIDATE)}
        >
          Submit AREA
        </button>
      </div>
    );
  }

  const HTMLenterAreaName = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <AREAForm
          fields={[
            {
              title: "AREA name",
              type: "string"
            }
          ]}
          setDatas={(data: string) => {
            submitAREA(data);
          }}
        ></AREAForm>
      </div>
    );
  }

  /* Submit function */
  /**
   * @function submitAREA
   * @description Submit AREA to API and close modal
   */
  const submitAREA = async (name: string) => {
    // CALL API TO STORE AREA
    if (action === undefined || reactions === undefined || actionDatas === "" || reactionDatas === undefined) {
      console.error("Error in submitAREA");
      return;
    }
    let newActionTokenIds: number[] = [];

    newActionTokenIds.push((await actionReactionJsonDataService.getOauthIdsFromActionId(action.id))[0]);
    for (const reaction of reactions) {
      newActionTokenIds.push((await actionReactionJsonDataService.getOauthIdsFromReactionId(reaction.id))[0]);
    }
    const reactionIds: number[] = reactions.map(reaction => reaction.id);

    if (newActionTokenIds.length === 0 || newActionTokenIds.length !== reactionIds.length + 1) {
      console.error("Error in submitAREA: actionTokenIds is empty");
      return (
        <div className="flex flex-col items-center justify-center">
          You must be connected to the service to create an AREA
        </div>
      )
    }
    onClose();
    await storeArea(name, action.id, reactionIds, actionDatas, reactionDatas, newActionTokenIds);
    clearDatas();
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
            {step === Step.ENTER_AREA_NAME_AND_VALIDATE && HTMLenterAreaName()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalUI;

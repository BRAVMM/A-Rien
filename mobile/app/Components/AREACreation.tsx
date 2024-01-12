import { styled } from "nativewind";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {useNavigation} from "expo-router";

import AREAForm from "./AREAForm";
import BravmmModal from "./BravmmModal";
import colors from "../../constants/Colors";
import {
  ModalDataInterface,
  ServiceActionInterface,
  ServiceReactionInterface,
} from "../Interfaces/ModalData.interface";
import actionReactionJsonDataService from "../Utils/actionReactionJsonData.serivce";
import { storeArea } from "../Utils/callApi";

const AREACreationModal: React.FC<{
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
    VALIDATE_OR_ADD_FORM,
  }

  const StyledText = styled(Text);
  const StyledTouchableOpacity = styled(TouchableOpacity);
  const StyledView = styled(View);

  const [isThereAnOauthToken, setIsThereAnOauthToken] = useState<JSX.Element>();
  const [actionJsonData, setActionJsonDatas] =
    useState<ServiceActionInterface[]>();
  const [reactionJsonData, setReactionJsonDatas] =
    useState<ServiceReactionInterface[]>();
  const [step, setStep] = useState<number>(Step.SELECT_SERVICE_ACTION);
  const [action, setAction] = useState<ServiceActionInterface>();
  const [actionDatas, setActionDatas] = useState<string>("");
  const [reactions, setReactions] = useState<ServiceReactionInterface[]>();
  const [reactionDatas, setReactionDatas] = useState<string[]>();
  const router = useNavigation();

  /* Clear functions */
  /**
   * @function clearDatas
   * @description Clear datas when modal is open or close
   * @returns {void}
   */
  const clearDatas = (): void => {
    setAction(undefined);
    setActionDatas("");
    setReactions(undefined);
    setReactionDatas(undefined);
    setIsThereAnOauthToken(undefined);
    setStep(Step.SELECT_SERVICE_ACTION);
  };

  const checkIfThereIsAnOauthToken = async () => {
    if (ModalData === undefined) {
      return;
    }
    const actionTokenIds: number[] =
      await actionReactionJsonDataService.getOauthIdsFromServiceId(
        router,
        ModalData.id,
      );
    if (actionTokenIds.length === 0) {
      setIsThereAnOauthToken(
        <View className="flex flex-col items-center justify-center">
          <Text>You must be connected to the service to create an AREA</Text>
        </View>,
      );
    }
  };

  /* useEffect */
  /**
   * @function useEffect
   * @description useEffect to clear datas when modal is open
   */
  useEffect(() => {
    if (isOpen) {
      checkIfThereIsAnOauthToken().then((r) => r);
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
    const actionJsonData_: Promise<ServiceActionInterface[]> =
      actionReactionJsonDataService.getActionJsonData(router, ModalData.id);

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
      const reactionDatas = actionReactionJsonDataService.getReactionJsonData(
          router,
          action.id,
      );
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
    const newReaction: ServiceReactionInterface[] = [
      reaction,
      ...(reactions || []),
    ];

    setReactions(newReaction);
  };

  /**
   * @function updateReactionDatas
   * @param {string} data - data to store
   */
  const updateReactionDatas = (data: string) => {
    const newReactionDatas: string[] = [data, ...(reactionDatas || [])];

    setReactionDatas(newReactionDatas);
  };

  if (!isOpen || !ModalData) {
    return null;
  }

  /**
   * @function HTMLselectServiceAction
   * @description HTML for select Service Action
   * @returns {JSX.Element}
   * @note Step 1
   */
  const HTMLselectServiceAction = (): JSX.Element => {
    if (isThereAnOauthToken) {
      return isThereAnOauthToken;
    }
    return (
      <StyledView className="flex flex-col justify-center top-[50%]">
        <StyledView className="flex flex-col justify-center">
          {actionJsonData?.map((action) => (
            <StyledView
              key={action.id}
              className="flex justify-center top-[10%] left-[10%]"
            >
              <StyledTouchableOpacity
                onPress={() => {
                  setAction(action);
                  setStep(Step.SELECT_SERVICE_ACTION_DATA);
                }}
                className="p-5 rounded-2xl mt-5"
                style={{
                  // Add additional styling here if needed
                  backgroundColor: colors.light.thirdly,
                  width: "80%",
                }}
              >
                <StyledText
                  style={{
                    // Add additional styling here if needed
                    color: "#FFFFFF",
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {action.name}
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          ))}
        </StyledView>
      </StyledView>
    );
  };

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
      const reactionDatas = actionReactionJsonDataService.getReactionJsonData(
          router,
          action.id,
      );
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
      />
    );
  };

  /**
   * @function HTMLselectReaction
   * @description HTML for select Reaction
   * @returns {JSX.Element}
   * @note Step 3
   */
  const HTMLselectReaction = (): JSX.Element => {
    return (
      <View className="flex flex-col items-center justify-center">
        <View className="flex flex-col items-center justify-center">
          {reactionJsonData?.map((reaction) => (
            <StyledView
              key={reaction.id}
              className="flex justify-center top-[10%] left-[10%]"
            >
              <StyledTouchableOpacity
                onPress={() => {
                  setStep(Step.SELECT_SERVICE_REACTION_DATA);
                  updateReaction(reaction);
                }}
                className="p-5 rounded-2xl mt-5"
                style={{
                  // Add additional styling here if needed
                  backgroundColor: colors.light.thirdly,
                  width: "80%",
                }}
              >
                <StyledText
                  style={{
                    // Add additional styling here if needed
                    color: "#FFFFFF",
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {reaction.name}
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          ))}
        </View>
      </View>
    );
  };

  /**
   * @function HTMLselectServiceReactionDataForm
   * @description HTML for select Service Reaction Data Form
   * @returns {JSX.Element}
   * @note Step 4
   */
  const HTMLselectServiceReactionDataForm = (): JSX.Element => {
    if (reactions?.[0].args.length === 0) {
      setStep(Step.VALIDATE_OR_ADD_FORM);
      updateReactionDatas("[]");
    }

    return (
      <AREAForm
        fields={reactions?.[0].args || []}
        setDatas={(data: string) => updateReactionDatas(data)}
      />
    );
  };

  /**
   * @function HTMLvalidateOrAddForm
   * @description HTML for validate or add a new Reaction
   * @returns {JSX.Element}
   * @note Step 5
   */
  const HTMLvalidateOrAddForm = (): JSX.Element => {
    return (
      <View className="flex flex-col items-center justify-center">
        <StyledView className="flex justify-center top-[10%] left-[10%]">
          <StyledTouchableOpacity
            onPress={() => setStep(Step.SELECT_SERVICE_REACTION)}
            className="p-5 rounded-2xl mt-5"
            style={{
              // Add additional styling here if needed
              backgroundColor: colors.light.thirdly,
              width: "80%",
            }}
          >
            <StyledText
              style={{
                // Add additional styling here if needed
                color: "#FFFFFF",
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Add an other reaction
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>

        <StyledView className="flex justify-center items-center top-[10%]">
          <StyledTouchableOpacity
            onPress={() => setStep(Step.ENTER_AREA_NAME_AND_VALIDATE)}
            className="p-3 rounded-2xl mt-5"
            style={{
              // Add additional styling here if needed
              backgroundColor: colors.light.fourthly,
              width: "50%",
            }}
          >
            <StyledText
              style={{
                // Add additional styling here if needed
                color: "#FFFFFF",
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Submit Area
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </View>
    );
  };

  const HTMLenterAreaName = () => {
    return (
      <View className="flex flex-col items-center justify-center">
        <AREAForm
          fields={[
            {
              title: "AREA name",
              type: "string",
              description: "Enter AREA name",
            },
          ]}
          setDatas={(data: string) => {
            submitAREA(data).then((r) => r);
          }}
        />
      </View>
    );
  };

  /* Submit function */
  /**
   * @function submitAREA
   * @description Submit AREA to API and close modal
   */
  const submitAREA = async (name: string) => {
    // CALL API TO STORE AREA
    if (
      action === undefined ||
      reactions === undefined ||
      actionDatas === "" ||
      reactionDatas === undefined
    ) {
      console.error("Error in submitAREA");
      return;
    }
    const newActionTokenIds: number[] = [];

    newActionTokenIds.push(
      (
        await actionReactionJsonDataService.getOauthIdsFromActionId(router, action.id)
      )[0],
    );
    for (const reaction of reactions) {
      newActionTokenIds.push(
        (
          await actionReactionJsonDataService.getOauthIdsFromReactionId(
              router,
              reaction.id,
          )
        )[0],
      );
    }
    const reactionIds: number[] = reactions.map((reaction) => reaction.id);

    if (
      newActionTokenIds.length === 0 ||
      newActionTokenIds.length !== reactionIds.length + 1
    ) {
      console.error("Error in submitAREA: actionTokenIds is empty");
      return (
        <View className="flex flex-col items-center justify-center">
          <Text>You must be connected to the service to create an AREA</Text>
        </View>
      );
    }
    onClose();
    await storeArea(
      name,
      action.id,
      reactionIds,
      actionDatas,
      reactionDatas,
      newActionTokenIds,
    );
    clearDatas();
  };

  const RenderContent = () => {
    switch (step) {
      case Step.SELECT_SERVICE_ACTION:
        return HTMLselectServiceAction();
      case Step.SELECT_SERVICE_ACTION_DATA:
        return HTMLselectServiceDataActionForm();
      case Step.SELECT_SERVICE_REACTION:
        return HTMLselectReaction();
      case Step.SELECT_SERVICE_REACTION_DATA:
        return HTMLselectServiceReactionDataForm();
      case Step.VALIDATE_OR_ADD_FORM:
        return HTMLvalidateOrAddForm();
      case Step.ENTER_AREA_NAME_AND_VALIDATE:
        return HTMLenterAreaName();
      default:
        return null;
    }
  };

  return (
    <BravmmModal
      visible={isOpen}
      animationType="slide"
      onRequestClose={onClose}
      transparent={true}
      style={{ flex: 1, position: "absolute", top: 0, left: 0 }}
    >
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <StyledView className="flex flex-col items-center justify-center top-[7%]">
          <StyledText className="text-5xl font-bold text-white items-center">
            {ModalData.name}
          </StyledText>
          {step === Step.SELECT_SERVICE_ACTION ? (
            <StyledText className="text-white text-2xl font-bold top-[30%]">
              Select an Action
            </StyledText>
          ) : null}
          {step === Step.SELECT_SERVICE_REACTION ? (
            <StyledText className="text-white text-2xl font-bold top-[30%]">
              Select a reaction
            </StyledText>
          ) : null}
        </StyledView>
        <ScrollView style={{ marginTop: "15%" }}>
          <RenderContent />
        </ScrollView>
      </SafeAreaView>
    </BravmmModal>
  );
};

export default AREACreationModal;

import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { generalAction } from "@/api-services/actions/generalAction";
import { GeneralState } from "@/types/general";
import { RootState } from "@/types/root";
import QRCodeScene from "@/components/Wap/components/Main/Support/QRCodeScene";
import SupportDefaultScene from "@/components/Wap/components/Main/Support/SupportDefaultScene";

type Props = {
  general: GeneralState;
  handleContactCs: () => void;
};

type SupportSceneType = "initial" | "qr";

const Support = (props: Props) => {
  const [scene, setScene] = useState<SupportSceneType>("initial");

  useEffect(() => {
    setScene("initial");
  }, []);

  const goBack = useCallback(() => {
    setScene("initial");
  }, []);

  const switchScene = (scene: SupportSceneType) => {
    switch (scene) {
      case "initial":
      default:
        return (
          <SupportDefaultScene
            brandsSupportList={props.general.brandsSupport}
            csLiveChatUrl={props.general?.livechat?.setting?.url || ""}
            handleContactCs={props.handleContactCs}
          />
        );

      case "qr":
        return (
          <QRCodeScene
            handleGoBack={goBack}
            brandsSupportList={props.general.brandsSupport}
          />
        );
    }
  };

  return switchScene(scene);
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getBrandCommunicationList: () =>
      dispatch(generalAction.getBrandCommunication()),
  };
};

const mapStateToProps = (state: RootState) => {
  return { general: state.general };
};

export default connect(mapStateToProps, mapDispatchToProps)(Support);

import React, { useState } from "react";
import i18n from "@/utils/i18n";
import config from "@/config/config";
import IMHandler from "@/components/Wap/components/Main/Support/IMHandler";
import { Dialog, Theme } from "@material-ui/core";
import { BrandsSupport } from "@/types/general";
import styled from "styled-components";

const SupportBackground = styled.div<{ theme: Theme; language: string }>`
  z-index: 10;
  overflow-y: scroll;
  width: 100%;
  height: 100vh;
  position: relative;
  top: 0;

  ${({ theme, language }) => {
    if (config.features.Wap_SupportCustomBackground) {
      const prefix = config.features.Wap_SupportCustomBackground ? "-hk28" : "";
      return ` background: url(${
        process.env.PUBLIC_URL +
        `/assets/images/wapp/resource/T${config.wapVersion}/support/${language}${prefix}.png`
      })
      no-repeat;`;
    } else {
      return `background:` + theme.supportBg;
    }
  }};
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  overflow-y: scroll;
`;

const TheGirlHolder = styled.div<{ language: string }>`
  height: 575px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  opacity: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  ${({ language }) => {
    if (!config.features.Wap_SupportCustomBackground) {
      return `background: url(${
        process.env.PUBLIC_URL +
        `/assets/images/wapp/resource/support/${language}.png`
      })
      no-repeat;`;
    }
  }};
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
`;

const PhoneHolder = styled.div<{ theme: Theme & { primary: string } }>`
  font-size: 20px;
  color: ${({ theme }) => theme.primary};
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  font-weight: bold;
  top: 485px;
  left: 130px;
`;

const IconPhone = styled.div<{
  theme: Theme & { primary: string };
  src: string;
}>`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  background: ${({ theme }) => theme.primary};
  margin-right: 10px;
  mask: ${({ src }) => {
    return `url(${src}) no-repeat center /
contain;`;
  }};
`;

const ButtonContainer = styled.div`
  margin-top: 40vh;
  display: grid;
  grid-template-columns: auto;
  padding-bottom: 100px;
`;

const TheSupportButton = styled.div<{ onClick: () => void }>`
  margin: 10px 20px;
  color: #707070;
  background: white;
  height: 100px;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 50px;
  font-size: 30px;
`;

const IconTextContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const iconSwitcher = (icon: string) => {
  switch (icon) {
    case "WeChat":
      return "support-wechat.svg";
    case "Line":
      return "support-line.svg";
    case "Telegram":
      return "support-telegram.svg";
    case "Skype":
      return "support-skype.svg";
    case "KakaoTalk":
      return "support-kakaotalk.svg";
    case "Viber":
      return "support-viber.svg";
    case "WhatsApp":
      return "support-whatsapp.svg";
    case "Zalo":
      return "support-zalo.svg";
    case "copy":
      return "copy.png";
    default:
      return "support-call.svg";
  }
};
const Icon = styled.div<{ theme: Theme & { primary: string }; icon: string }>`
  width: 60px;
  height: 60px;
  margin-right: 20px;
  background-color: ${({ theme }) => theme.primary};
  mask: ${({ icon }) => {
    return `url(${
      process.env.PUBLIC_URL + "/assets/images/wapp/" + iconSwitcher(icon)
    }) no-repeat center /
    contain;`;
  }};
`;

const TheRedText = styled.div<{ theme: Theme & { primary: string } }>`
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
`;

const QRCodeHolder = styled.div`
  margin: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const QRCodeText = styled.div`
  padding: 10px 0px;
  font-weight: bold;
  font-size: 34px;
`;

const IDText = styled.div`
  font-size: 24px;
`;

const QRCodeImage = styled.img`
  height: 350px;
  width: 350px;
`;

type Props = {
  brandsSupportList: BrandsSupport[];
  csLiveChatUrl: string;
  handleContactCs: () => void;
};
const SupportDefaultScene = ({
  brandsSupportList,
  csLiveChatUrl,
  handleContactCs,
}: Props) => {
  const [selectedSupport, setSelectedSupport] = useState<string | null>(null);

  const handleClick = (brandsSupport: BrandsSupport) => {
    if (brandsSupport.qrcodeurl) {
      setSelectedSupport(brandsSupport.type);
    } else {
      IMHandler(brandsSupport.type, brandsSupport.phone);
    }
  };

  const handleClose = () => {
    setSelectedSupport(null);
  };

  function copyText(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <SupportBackground language={i18n.language}>
      <TheGirlHolder language={i18n.language} />

      {config.features.DisplayPhone && (
        <PhoneHolder>
          <IconPhone
            src={process.env.PUBLIC_URL + `/assets/images/wapp/phone.png`}
          />
          {brandsSupportList &&
            brandsSupportList.length >= 1 &&
            brandsSupportList[0].phone}
        </PhoneHolder>
      )}

      <ButtonContainer>
        {(config.features.LiveChatVendor || csLiveChatUrl) && (
          <TheSupportButton
            onClick={() => {
              handleContactCs();
            }}
          >
            <IconTextContainer>
              <Icon icon="wechat" />
              <div>{i18n.t("support.online")}</div>
            </IconTextContainer>
            <TheRedText>{i18n.t("support.contact")}</TheRedText>
          </TheSupportButton>
        )}

        {brandsSupportList.map((brandsSupport, index) => {
          return (
            <div key={index}>
              <TheSupportButton onClick={() => handleClick(brandsSupport)}>
                <IconTextContainer>
                  <Icon icon={brandsSupport.type} />
                  <div>
                    <div>{brandsSupport.type}</div>
                  </div>
                </IconTextContainer>
                <div>{<TheRedText>{i18n.t("support.join")}</TheRedText>}</div>
              </TheSupportButton>

              <Dialog
                open={selectedSupport === brandsSupport.type}
                onClose={handleClose}
              >
                {brandsSupport.qrcodeurl ? (
                  <QRCodeHolder>
                    <QRCodeImage src={brandsSupport.qrcodeurl} />
                    <QRCodeText>{brandsSupport.type}</QRCodeText>
                  </QRCodeHolder>
                ) : (
                  <QRCodeHolder>
                    <QRCodeText>{brandsSupport.type}</QRCodeText>
                    <IDText>ID: {brandsSupport.appid}</IDText>
                  </QRCodeHolder>
                )}
              </Dialog>
            </div>
          );
        })}
      </ButtonContainer>
    </SupportBackground>
  );
};

export default SupportDefaultScene;

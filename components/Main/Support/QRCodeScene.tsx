import React from "react";
import i18n from "@/utils/i18n";
import QRCode from "qrcode.react";
import styled from "styled-components";
import { BrandsSupport } from "@/types/general";
import { Theme } from "@material-ui/core";

const Background = styled.div`
  min-height: 100%;
`;

interface TitleHeaderProps {
  theme: Theme & { primary: string };
}

const TitleHeader = styled.div<TitleHeaderProps>`
  background: ${({ theme }) => theme.primary};
  height: 90px;
  display: flex;
  align-items: center;
`;

const BackButton = styled.div`
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/btn-back-white.png`})
    no-repeat center;
  width: 80px;
  height: 90px;
  z-index: 1;
`;

const QRTitle = styled.div`
  width: calc(100%);
  margin-left: -80px;
  text-align: center;
  color: white;
  font-size: 34px;
`;

const QRCodeContainer = styled.div`
  min-height: 300px;
  display: grid;
  grid-template-columns: auto;
  padding: 30px;
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

type Props = {
  brandsSupportList: BrandsSupport[];
  handleGoBack: () => void;
};
const QRCodeScene = ({ brandsSupportList, handleGoBack }: Props) => {
  return (
    <Background>
      <TitleHeader>
        <BackButton onClick={handleGoBack} />
        <QRTitle>
          {
            //i18n.t('support.qr')
            i18n.t("support.qr")
          }
        </QRTitle>
      </TitleHeader>
      <QRCodeContainer>
        {brandsSupportList.map((brandsSupport, index) => {
          return (
            <QRCodeHolder key={index}>
              <>
                <QRCode
                  value={brandsSupport.qrcodeurl || ""}
                  bgColor={"#f6f8f7"}
                  size={150}
                />
              </>
              <QRCodeText>{brandsSupport.type}</QRCodeText>
            </QRCodeHolder>
          );
        })}
      </QRCodeContainer>
    </Background>
  );
};

export default QRCodeScene;

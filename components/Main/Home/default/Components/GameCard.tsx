import * as React from "react";
import styled from "styled-components";
import i18n from "@/utils/i18n";
import HomePageGame from "@/models/homePageGame";
import { GameTypeEnum } from "@/api-services/utils/Enum";

interface GameFrameImgProps {
  src: string;
  id: string;
  onClick: () => void;
}
const GameFrameImg = styled.div<GameFrameImgProps>`
  margin: 0 auto 10px auto;
  display: block;
  width: 100%;
  height: 225px;
  background: url(${(props: any) => props.src}) no-repeat;
  background-position: center;
  background-size: 100%;
`;

const Maintenance = styled.div`
  display: none;
  position: absolute;
  width: 521px;
  height: 225px;
  justify-content: center;
  align-items: center;
  color: white;
  z-index: 1;
  font-size: 32px;
  text-transform: capitalize;
`;

interface NewWrapperProps {
  maintenance: boolean;
}

const NewWrapper = styled.div<NewWrapperProps>`
  ${({ maintenance }) => {
    return maintenance
      ? `
      ${GameFrameImg}{
        filter: brightness(40%) grayscale(200%);
      }
      ${Maintenance}{
        display: flex;
    
    }`
      : ``;
  }}
`;

const ButtonStartGame = styled.div`
  width: 148px;
  height: 43px;
  background: url(${
    process.env.PUBLIC_URL + `/assets/images/wapp/btn-start-game.png`
  }) no-repeat;
  background-size: 100%;
  margin: 150px 0 0 76px;
  font-size:16px;
  font-weight:bold;
  line-height:37px;
  text-align:center;
  color:#fff;
  padding-top: 5px;
} 
`;

type Props = {
  isMaintenance: boolean;
  homePageGame: HomePageGame;
  id: string;
  handleGameClick: (
    type: number,
    gpcode: string,
    game_platform_id: number
  ) => void;
};

const TEMPLATE_VERSION = "/T1T2";

const GameCard = (props: Props) => {
  const { isMaintenance, homePageGame, id, handleGameClick } = props;

  return (
    <NewWrapper maintenance={isMaintenance}>
      <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>

      <GameFrameImg
        src={`${
          process.env.PUBLIC_URL
        }/assets/images/wapGame${TEMPLATE_VERSION}/${getImgPrefix(
          homePageGame.type
        )}-${homePageGame.abbreviation.toLowerCase()}.png`}
        id={id}
        onClick={() => {
          handleGameClick(
            homePageGame.type,
            homePageGame.gpcode,
            homePageGame.game_platform_id
          );
        }}
      >
        <ButtonStartGame>{i18n.t("common.startGame")}</ButtonStartGame>
      </GameFrameImg>
    </NewWrapper>
  );
};

export default GameCard;

function getImgPrefix(gameType: number) {
  switch (gameType) {
    case GameTypeEnum.FISH:
      return "fish";
    case GameTypeEnum.LIVE:
      return "live";
    case GameTypeEnum.LIVELOBBY:
      return "live";
    case GameTypeEnum.LOTTERYLOBBY:
      return "lottery";
    case GameTypeEnum.QIPAI:
      return "chess";
    case GameTypeEnum.QIPAILOBBY:
      return "chess";
    case GameTypeEnum.SLOT:
      return "slot";
    case GameTypeEnum.SPORTS:
    case GameTypeEnum.RNGSPORTS:
      return "sports";
    case GameTypeEnum.ESPORTS:
      return "esports";
    case GameTypeEnum.COCKFIGHT:
      return "cockfight";
    case GameTypeEnum.TIGERSLOT:
      return "slot";
    case GameTypeEnum.TABLEGAME:
      return "table";
    default:
      return "";
  }
}

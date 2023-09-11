import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { GameTypeEnum } from "@/api-services/utils/Enum";
import Common from "@/utils/Common";
import i18n from "@/utils/i18n";
import config from "@/config/config";

import Slider from "../Slider";
import CustomPopover from "@/components/Share/custompopover";
import { SortedMenuList } from "@/utils/HeaderSorting";
import { Textfit } from "react-textfit";
import PromotionRoulette from "../PromotionRoulette";
import OnlineUserDisplayer from "@/components/Share/online-user-displayer";
import { GameService } from "@/api-services/services/GameService";
import MobileHeader from "@/components/Wap/components/Main/Home/default/Components/MobileHeader";
import MobileMarquee from "@/components/Wap/components/Main/Home/default/Components/MobileMarquee";
import { getSortedGameList } from "@/components/Wap/components/Main/Home/default/utils/getSortedGameTypeList";
import GameCard from "@/components/Wap/components/Main/Home/default/Components/GameCard";
// import UserProfile from "@/components/Wap/components/Main/Home/default/Components/UserProfile";
const StyledAppBar = withStyles({
  root: {
    height: "650px",
    boxShadow: "none",
  },
})(AppBar);

const FixedContainer = styled.div`
  background-color: #fff;
  height: 265px;
  border-radius: 20px 20px 0 0;
  width: 100%;
  position: absolute;
  bottom: -2px;
`;

const ProfileContainer = styled.div`
  width: 723px;
  height: 192px;
  margin: 0 auto;
`;

const ProfileContainerTop = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 10px 10px 0 0;

  padding: 15px 25px 0 26px;
`;

const ProfileContainerBottom = styled.div`
  width: 100%;

  padding: 0 25px 0 26px;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
`;

const WelcomeLabel = styled.div`
  float: left;

  font-size: 22px;

  color: #dfdfdf;
`;

const WelcomeUsernameLabel = styled(WelcomeLabel)`
  color: #fde73f;
  font-weight: bold;
`;

const ProfileLink = styled(WelcomeLabel)`
  float: right;
`;

const DisplayerContainer = styled.div`
  float: right;
`;

const BalanceContainer = styled.div`
  float: left;
`;
const BalanceAmount = styled.div`
  font-size: 35px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  width: 100%;
  margin-top: 35px;
`;

const WalletTypeLabel = styled(WelcomeLabel)`
  text-align: center;
  width: 100%;
  margin-top: 10px;
`;

const WalletActionContainer = styled.div`
  float: right;
`;

const WalletActionUL = styled.ul`
  text-align: center;
  margin-top: 15px;
  font-size: 28px;
  color: #ffffff;
`;

const WalletActionLI = styled.li`
  display: inline-table;
  padding: 0 10px;
  font-size: 24px;
  text-align: center;
`;

const WalletActionIcon = styled.div`
  ${(props) => `background:url(${props.img}) no-repeat center center; `}
  background-color: ${(props) => props.theme.secondary};
  margin: 0 auto;
  border-radius: 50%;
  background-size: 60px;
  width: 80px;
  height: 80px;
`;

const ButtonSignup = styled.div`
  min-width: 195px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 71px;
  border-radius: 55px;
  background: ${({ theme }) => theme.loginRegisterBtn};
  border: solid 2px #fff;
  margin: 40px 0 0 0;
  color: ${({ theme }) => theme.loginRegisterBtnText};
  text-align: center;
  padding: 17px 0;
  font-size: 28px;
`;
const GameSelectionContainer = styled.div`
  font-size: 48px;
  position: absolute;
  top: 650px;
  left: 0;
`;
const GameSelectionUL = styled.div`
  font-size: 35px;
  font-weight: bold;
  color: #cdcdcd;
  margin: 0;

  padding: 0 0px;
  width: 176px;
  overflow-y: auto;
  height: calc(100vh - 740px);
  padding-bottom: 10px;
`;

const GameSelectionLI = styled.div`
  width: 130px;
  height: 69px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 2px #adadad;
  background-color: #ededed;
  margin: 16px auto 0 auto;

  font-size: 35.5px;

  line-height: 1.7;

  color: ${({ theme }) => theme.secondary};
  text-align: center;
  ${({ selected, theme }) => {
    return selected
      ? ` 
  color: ${theme.accentText};
  border: solid 2px #000;
  background-image: linear-gradient(to top, ` +
          theme.primaryGradient +
          `, ` +
          theme.primary +
          `);
          
          `
      : ``;
  }}
`;

const GameListContainer = styled.div`
  padding-top: 670px;
  padding-bottom: 100px;
  padding-left: 175px;
  background-color: #fff;
`;

const GameListWrap = styled.div`
  width: 557px;
  padding: 25px 18px;
  border-radius: 10px;
  background-color: #ededed;
`;

const DownloadContainer = styled.div`
  position: fixed;
  right: 10px;
  bottom: 100px;
  display: flex;
  width: 150px;
  height: 150px;
`;

const DownloadButton = styled.div`
 margin-top: 20px;
  border: solid 3px ${({ theme }) => theme.primary};
  background: #fff;
  border-radius: 10px
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(45deg);
`;

const DownloadContent = styled.div`
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const DownloadText = styled.div`
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
  font-size: 24px;
`;

const DownloadIcon = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 5px;
  background: ${({ theme }) => theme.primary};
  mask: ${({ src }) => {
    return `url(${src}) no-repeat center /
contain`;
  }};
`;

const CloseButton = styled.div`
  position: relative;
  left: 110px;
  font-size: 20px;
`;

const GameType = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
`;

const GameTypeName = styled.div`
  padding-bottom: 10px;
  opacity: 0.65;
  font-size: 24px;
  color: ${({ theme }) => theme.popoverGameTypeText};
`;

const BrandAndBalance = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 20px;
  font-size: 24px;
  min-width: 400px;
  color: ${({ theme }) => theme.popoverSubWalletText};
`;
const Brand = styled.div`
  padding-left: 5px;
`;

const Balancex = styled.div`
  text-align: right;
  opacity: 0.75;
`;

const BrandAndBalanceButBigger = styled(BrandAndBalance)`
  border-bottom: solid 1px ${({ theme }) => theme.popoverSubWalletText};
  margin-bottom: 20px;
  padding-bottom: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  font-size: 30px;
  display: flex;
  align-self: flex-end;
`;

const RouletteFloatingPanel = styled.div`
  position: fixed;
  z-index: 1300;

  ${({ position }) => {
    return position !== undefined
      ? Object.keys(position).map((key) => {
          return `${key}: ${position[key]}px;`;
        })
      : `  top: 0;
    left: 0;
    padding-top: 16%;
    padding-left: 2%;`;
  }}

  display: flex;
  flex-direction: ${({ orientation }) => {
    return orientation ? orientation : "column";
  }};
`;
class Default extends Component {
  state = {
    value: 0,
    marqueeText: [],
    banner_list: [],
    gameTypeListSorting: [],
    downloadButton: true,
    anchorEl: false,
    selectedGameType: 0,
    tab1: {
      limit: 10,
      page: 0,
      totalPage: 0,
      list: [],
      verifyList: [],
    },
    tab2: {
      limit: 10,
      page: 0,
      totalPage: 0,
      list: [],
    },
    loading: true,
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    if (this.props.game.homePageGameList.length <= 0) return;

    const gameTypeListSorting = getSortedGameList(
      this.props.game.homePageGameList
    );
    this.setState({
      ...this.state,
      gameTypeListSorting: gameTypeListSorting,
      selectedGameType: gameTypeListSorting[0],
    });
  }
  componentDidUpdate(preProps) {
    const isGameListUpdated =
      preProps.game.homePageGameList.length !==
      this.props.game.homePageGameList.length;
    if (!isGameListUpdated) return;

    const gameTypeListSorting = getSortedGameList(
      this.props.game.homePageGameList
    );

    this.setState({
      ...this.state,
      gameTypeListSorting: gameTypeListSorting,
      selectedGameType: gameTypeListSorting[0],
    });
  }

  constructor(props) {
    super(props);
    this.scrollRef = React.createRef();
  }

  handleScroll = (e) => {
    const doc = document.documentElement;

    let top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

    top = top + 530;

    let reachedTheForthItem =
      this.state.gameTypeListSorting.indexOf(this.state.selectedGameType) > 3 &&
      this.state.gameTypeListSorting.indexOf(this.state.selectedGameType) < 6;
    let reachedTheSeventhItem =
      this.state.gameTypeListSorting.indexOf(this.state.selectedGameType) >= 6;

    if (this.state.gameTypeListSorting.length > 5) {
      if (reachedTheForthItem) {
        this.scrollRef.current.scrollTo(0, 500);
      } else if (reachedTheSeventhItem) {
        this.scrollRef.current.scrollTo(0, 750);
      } else {
        this.scrollRef.current.scrollTo(0, 0);
      }
    } else {
      this.scrollRef.current.scrollTo(
        0,
        this.state.gameTypeListSorting.indexOf(this.state.selectedGameType) *
          150
      );
    }

    var D = document;
    var docHeight = Math.max(
      D.body.scrollHeight,
      D.documentElement.scrollHeight,
      D.body.offsetHeight,
      D.documentElement.offsetHeight,
      D.body.clientHeight,
      D.documentElement.clientHeight
    );

    const gameTypeListSorting = this.state.gameTypeListSorting;
    let gameType = gameTypeListSorting[0];
    if (window.innerHeight + window.scrollY >= docHeight - 2) {
      gameType = gameTypeListSorting[gameTypeListSorting.length - 1];
    } else {
      for (let i = gameTypeListSorting.length - 1; i >= 0; i--) {
        if (
          top >
          document.getElementById("gameType" + gameTypeListSorting[i]).offsetTop
        ) {
          gameType = gameTypeListSorting[i];
          break;
        }
      }
    }
    this.setState({ ...this.state, selectedGameType: gameType });
  };

  handleGameTypeClick = (selectedGameType) => {
    const consistentTop = 650;

    let pos = document.getElementById("gameType" + selectedGameType).offsetTop;
    window.scrollTo({ top: pos - consistentTop + 5, behavior: "smooth" });
  };

  handleJoinLotteryGame = (name) => {
    if (!this.props.account.token) {
      this.props.appHistory.push("/login");
      return;
    }

    //  window.open( "/joinlottery/" + name, "gamewindow");
    Common.closePreviousPopup();
    Common.PopupCenter("/joinlottery/" + name, "gamewindow");
  };

  handleJoinOtherGame = (type, params, game_platform_id) => {
    if (!this.props.account.token) {
      this.props.appHistory.push("/login");
      return;
    }

    if (type === GameTypeEnum.COCKFIGHT) {
      if (params === "SM01") {
        this.popup = window.open("", "Cockfight");
        GameService.GetCockfight()
          .then((e) => {
            this.popup.document.write(e.data);
            this.popup.document.close();
            this.popup.focus();
          })
          .catch((e) => {
            this.popup.close();
          });
      } else {
        Common.closePreviousPopup();
        Common.PopupCenter(
          "/joinlobbygame/" + GameTypeEnum.SPORTS + "/" + params,
          "gamewindow"
        );
      }
    } else if (
      type === GameTypeEnum.SLOT ||
      type === GameTypeEnum.TIGERSLOT ||
      type === GameTypeEnum.TABLEGAME ||
      type === GameTypeEnum.FISH
    ) {
      this.props.navigate(`/slots/${params}/${type}`);
    } else {
      if (document.getElementById("audio") != null)
        document.getElementById("audio").volume = 0;
      Common.closePreviousPopup();

      Common.PopupCenter("/joinlobbygame/" + type + "/" + params, "gamewindow");
    }
  };

  handleGameClick = (type, params, game_platform_id) => {
    if (type === GameTypeEnum.RNGSPORTS) {
      if (!this.props.account.token) {
        this.props.appHistory.push("/login");
        return;
      } else {
        this.props.appHistory.push("/sports/" + params);
      }
    } else {
      type === GameTypeEnum.LOTTERYLOBBY || type === GameTypeEnum.LOTTERY
        ? this.handleJoinLotteryGame(params)
        : this.handleJoinOtherGame(type, params, game_platform_id);
    }
  };

  handleSignupClick = () => {
    this.props.appHistory.push("/login");
  };

  convertGameTypeToText(gameType) {
    switch (gameType) {
      case GameTypeEnum.LIVE:
        return i18n.t("wap.main.home.gameTab.live");
      case GameTypeEnum.COCKFIGHT:
        return i18n.t("common.cockfight");
      case GameTypeEnum.LIVELOBBY:
        return i18n.t("wap.main.home.gameTab.live");
      case GameTypeEnum.QIPAI:
        return i18n.t("wap.main.home.gameTab.chess");
      case GameTypeEnum.QIPAILOBBY:
        return i18n.t("wap.main.home.gameTab.chess");
      case GameTypeEnum.SPORTS:
        return i18n.t("wap.main.home.gameTab.sports");
      case GameTypeEnum.ESPORTS:
        return i18n.t("wap.main.home.gameTab.esports");
      case GameTypeEnum.LOTTERYLOBBY:
        return i18n.t("wap.main.home.gameTab.lottery");
      case GameTypeEnum.SLOT:
        return i18n.t("wap.main.home.gameTab.slot");
      case GameTypeEnum.FISH:
        return i18n.t("wap.main.home.gameTab.fish");
      case GameTypeEnum.TIGERSLOT:
      case GameTypeEnum.TABLEGAME:
        return i18n.t("wap.main.home.gameTab.electron");
      default:
        return "";
    }
  }

  handleClick = (e) => {
    this.setState({
      ...this.state,
      anchorEl:
        config.features.HomePageDisplayBalance || config.features.NewTransferUI
          ? e.currentTarget
          : null,
    });
  };

  handleClose = () => {
    this.setState({
      ...this.state,
      anchorEl: null,
    });
  };

  isRouletteAvailable = () => {
    return (
      this.props.general.promotionList.items &&
      this.props.general.promotionList.items.length > 0 &&
      this.props.general.promotionList.items.findIndex(
        (item) => item.promotionType.toUpperCase() === "ROULETTE"
      ) >= 0
    );
  };

  getDisplayedGameList = (homePageGameList) => {
    const displayGameType = Common.GetDisplayGameType();

    return homePageGameList
      .filter(
        (a) =>
          (displayGameType.indexOf(a.type) >= 0 &&
            a.type !== GameTypeEnum.RNGSPORTS) ||
          (a.type === GameTypeEnum.RNGSPORTS && a.abbreviation === "PPTF")
      )
      .sort((a, b) => {
        if (config.features.LiveGame_Sorting_SKY) {
          var sortDGFirst = ["DG"];
          return (
            sortDGFirst.indexOf(b.abbreviation) -
            sortDGFirst.indexOf(a.abbreviation)
          );
        } else return b - a;
      })
      .sort((a, b) => {
        return (
          this.state.gameTypeListSorting.indexOf(a.type) -
          this.state.gameTypeListSorting.indexOf(b.type)
        );
      });
  };

  render() {
    const brandLogo =
      this.props.general.brand && this.props.general.brand.mobileLogoUrl;
    const hasTransferProvider =
      Object.values(this.props.game.providerList).filter(
        (item) => item.transferwallet === true
      ).length > 0;

    const displayedGameList = this.getDisplayedGameList(
      this.props.game.homePageGameList
    );

    return (
      <>
        <StyledAppBar position="fixed" color="default">
          <MobileHeader img={brandLogo} />

          {/* Carousel */}
          <Slider />

          <FixedContainer>
            {/* Marquee */}
            <MobileMarquee />

            {/* User Profile Block */}
            {/*<UserProfile />*/}
            <ProfileContainer
              src={
                process.env.PUBLIC_URL + `/assets/images/wapp/home-profile.png`
              }
            >
              <ProfileContainerTop>
                {(() => {
                  if (this.props.account.token != null) {
                    return (
                      <React.Fragment>
                        <WelcomeLabel>
                          {i18n.t("wap.main.home.profile.welcomeBack")}
                        </WelcomeLabel>
                        <WelcomeUsernameLabel>
                          {this.props.account.info.member_username}(VIP
                          {this.props.account.info.member_level_id})
                        </WelcomeUsernameLabel>
                      </React.Fragment>
                    );
                  } else {
                    return (
                      <WelcomeLabel>
                        {i18n.t("wap.main.home.profile.pleaseLogin")}
                      </WelcomeLabel>
                    );
                  }
                })()}

                {config.features.OnlineUser ? (
                  <DisplayerContainer>
                    <OnlineUserDisplayer color="#fff" size="20px" />
                  </DisplayerContainer>
                ) : (
                  <ProfileLink
                    onClick={() => this.props.appHistory.push("/profile")}
                  >
                    {i18n.t("wap.main.home.profile.profile")}
                  </ProfileLink>
                )}
              </ProfileContainerTop>

              <ProfileContainerBottom>
                <BalanceContainer>
                  {(() => {
                    if (this.props.account.token != null) {
                      return (
                        <React.Fragment>
                          <React.Fragment>
                            <BalanceAmount
                              onClick={(e) => {
                                this.handleClick(e);
                              }}
                            >
                              {this.props.wallet.mainSymbol}
                              {Common.formatNumberWithThousand(
                                this.props.wallet.mainBalance +
                                  this.props.game.providerList
                                    .filter(
                                      (item) =>
                                        item.status === 0 &&
                                        item.transferwallet === true
                                    )
                                    .reduce((a, v) => (a = a + v.balance), 0)
                              )}
                            </BalanceAmount>
                            <CustomPopover
                              open={Boolean(this.state.anchorEl)}
                              anchorEl={this.state.anchorEl}
                              handleClose={this.handleClose}
                              height="1000px"
                            >
                              <div>
                                <BrandAndBalanceButBigger>
                                  <span style={{ paddingRight: 30 }}>
                                    {i18n.t("web.header.mainAccount")}
                                  </span>
                                  <div
                                    style={{
                                      width: 300,
                                      display: "flex",
                                      alignSelf: "flex-end",
                                      justifyContent: "flex-end",
                                    }}
                                  >
                                    <Textfit mode="single">
                                      {this.props.wallet.mainSymbol +
                                        Common.formatNumberWithThousand(
                                          this.props.wallet.mainBalance +
                                            this.props.game.providerList
                                              .filter(
                                                (item) =>
                                                  item.status === 0 &&
                                                  item.transferwallet === true
                                              )
                                              .reduce(
                                                (a, v) => (a = a + v.balance),
                                                0
                                              )
                                        )}
                                    </Textfit>
                                  </div>
                                </BrandAndBalanceButBigger>
                              </div>
                              {SortedMenuList.map((item, key) => {
                                return (
                                  <GameType key={key}>
                                    <GameTypeName>
                                      {i18n.t(item.title)}
                                    </GameTypeName>
                                    {this.props.game.homePageGameList
                                      .filter((game) => {
                                        return (
                                          (item.gameType.indexOf(game.type) >=
                                            0 &&
                                            game.type !==
                                              GameTypeEnum.RNGSPORTS) ||
                                          (game.type ===
                                            GameTypeEnum.RNGSPORTS &&
                                            game.abbreviation === "PPTF")
                                        );
                                      })
                                      .map((brand, index) => {
                                        return this.props.game.providerList
                                          .filter((item) => {
                                            return (
                                              item.abbreviation ===
                                              brand.abbreviation
                                            );
                                          })
                                          .map((data, index) => {
                                            return (
                                              <BrandAndBalance>
                                                <Brand>
                                                  {i18n.t(
                                                    `${data.abbreviation}.${item.path}`
                                                  )}
                                                </Brand>
                                                <Balancex>
                                                  {data.maintenance === 1
                                                    ? i18n.t(
                                                        "transfer.maintenance"
                                                      )
                                                    : Common.formatNumberWithCommas(
                                                        data.balance
                                                      )}
                                                </Balancex>
                                              </BrandAndBalance>
                                            );
                                          });
                                      })}
                                  </GameType>
                                );
                              })}
                            </CustomPopover>

                            <WalletTypeLabel>
                              {i18n.t("wap.main.home.profile.mainAccount")}
                            </WalletTypeLabel>
                          </React.Fragment>
                        </React.Fragment>
                      );
                    } else {
                      return (
                        <ButtonSignup onClick={this.handleSignupClick}>
                          {i18n.t("wap.main.home.profile.loginRegister")}
                        </ButtonSignup>
                      );
                    }
                  })()}
                </BalanceContainer>
                <WalletActionContainer>
                  <WalletActionUL>
                    {config.features.HomePage_DisplayVIP && (
                      <WalletActionLI
                        onClick={() => {
                          this.props.appHistory.push("/vip");
                        }}
                      >
                        <WalletActionIcon
                          img={
                            process.env.PUBLIC_URL +
                            `/assets/images/wapp/home-vip.png`
                          }
                        ></WalletActionIcon>
                        VIP
                      </WalletActionLI>
                    )}
                    <WalletActionLI
                      onClick={() => this.props.appHistory.push("/deposit")}
                    >
                      <WalletActionIcon
                        img={
                          process.env.PUBLIC_URL +
                          `/assets/images/wapp/icon-deposit.png`
                        }
                      ></WalletActionIcon>
                      {i18n.t("common.deposit")}
                    </WalletActionLI>
                    {hasTransferProvider && (
                      <WalletActionLI
                        onClick={() => this.props.appHistory.push("/transfer")}
                      >
                        <WalletActionIcon
                          img={
                            process.env.PUBLIC_URL +
                            `/assets/images/wapp/icon-transfer.png`
                          }
                        ></WalletActionIcon>
                        {i18n.t("common.transfer")}
                      </WalletActionLI>
                    )}

                    <WalletActionLI
                      onClick={() => {
                        if (
                          this.props.wallet.bankCardList != null &&
                          this.props.wallet.bankCardList.length === 0 &&
                          config.features.AddCard_NotAllowedEditDelete
                        ) {
                          this.props.alert(
                            "",
                            i18n.t("disabledAddCard.title") +
                              " " +
                              i18n.t("disabledAddCard.description")
                          );
                        } else {
                          this.props.appHistory.push("/withdrawal");
                        }
                      }}
                    >
                      <WalletActionIcon
                        img={
                          process.env.PUBLIC_URL +
                          `/assets/images/wapp/icon-withdrawal.png`
                        }
                      ></WalletActionIcon>
                      {i18n.t("common.withdrawal")}
                    </WalletActionLI>
                  </WalletActionUL>
                </WalletActionContainer>
              </ProfileContainerBottom>
            </ProfileContainer>
          </FixedContainer>

          {/* Game Type List */}
          <GameSelectionContainer>
            <GameSelectionUL ref={this.scrollRef}>
              {(() => {
                return this.state.gameTypeListSorting.map((type, index) => {
                  return (
                    <GameSelectionLI
                      style={
                        i18n.language === "en-US" ? { fontSize: "22px" } : {}
                      }
                      key={index}
                      selected={this.state.selectedGameType === type}
                      onClick={() => this.handleGameTypeClick(type)}
                    >
                      {this.convertGameTypeToText(type)}
                    </GameSelectionLI>
                  );
                });
              })()}
            </GameSelectionUL>
          </GameSelectionContainer>
        </StyledAppBar>

        {/* Game List */}
        <GameListContainer>
          <GameListWrap>
            {(() => {
              const displayGameType = Common.GetDisplayGameType();

              let currentType = -1;

              return displayedGameList.map((row, index) => {
                const id =
                  currentType !== row.type
                    ? `gameType${row.type}`
                    : `gameId${row.id}`;

                const jsx = (
                  <GameCard
                    key={index}
                    isMaintenance={row.status !== 0}
                    homePageGame={row}
                    id={id}
                    handleGameClick={this.handleGameClick}
                  />
                );

                currentType = row.type;
                return jsx;
              });
            })()}
          </GameListWrap>
        </GameListContainer>

        {config.features.HaveDownloadFeature && this.state.downloadButton && (
          <DownloadContainer>
            <CloseButton
              onClick={() => {
                this.setState({
                  ...this.state,
                  downloadButton: false,
                });
              }}
            >
              ⓧ
            </CloseButton>

            <DownloadButton
              onClick={() => {
                console.log("download");
                console.log(this.props);
                this.props.appHistory.push("/main/download");
              }}
            >
              <DownloadContent>
                <DownloadIcon
                  src={
                    process.env.PUBLIC_URL +
                    `/assets/images/wapp/icon-download.svg`
                  }
                />
                <DownloadText>APP</DownloadText>
              </DownloadContent>
            </DownloadButton>
          </DownloadContainer>
        )}

        {config.features.HomePage_PromoRoulette && (
          <RouletteFloatingPanel
            position={
              config.features.RouletteSetting &&
              config.features.RouletteSetting.wap &&
              config.features.RouletteSetting.wap.position
            }
            orientation={
              config.features.RouletteSetting &&
              config.features.RouletteSetting.wap &&
              config.features.RouletteSetting.wap.orientation
            }
          >
            {this.props.general.rouletteCount.length > 0 &&
              this.props.general.rouletteCount
                .filter(
                  (item) =>
                    item.promotiontype.toUpperCase() ===
                    "DEPOSITACCUMULATEROULETTE"
                )
                .map((roulette, index) => {
                  return roulette.roulettecount > 0 && index === 0 ? (
                    <PromotionRoulette
                      key={index}
                      rouletteType={roulette.promotiontype.toUpperCase()}
                      promotionDetail={{
                        id: roulette.promotionid,
                      }}
                    />
                  ) : null;
                })}

            {!config.features.RouletteNewFlow && this.isRouletteAvailable() && (
              <PromotionRoulette
                rouletteType="ROULETTE"
                promotionDetail={
                  this.props.general.promotionList.items.filter(
                    (item) => item.promotionType.toUpperCase() === "ROULETTE"
                  )[0]
                }
              />
            )}
          </RouletteFloatingPanel>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    account: state.account,
    ui: state.ui,
    wallet: state.wallet,
    game: state.game,
    general: state.general,
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     closeModal: () => {
//       dispatch({ type: "close" });
//     }
//   };
// };
export default connect(mapStateToProps, null)(withRouter(Default));

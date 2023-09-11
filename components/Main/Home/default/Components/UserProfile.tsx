import React from "react";
import { useSelector } from "react-redux";
import i18n from "@/utils/i18n";
import config from "@/config/config";
import OnlineUserDisplayer from "@/components/Share/online-user-displayer";
import Common from "@/utils/Common";
import CustomPopover from "@/components/Share/custompopover";
import { Textfit } from "react-textfit";
import { SortedMenuList } from "@/utils/HeaderSorting";
import { GameTypeEnum } from "@/api-services/utils/Enum";
import styled from "styled-components";
import { Theme } from "@material-ui/core";
import { store } from "@/store";

interface ProfileContainerProps {
  src: string;
}
const ProfileContainer = styled.div<ProfileContainerProps>`
  width: 723px;
  height: 192px;
  margin: 0 auto;
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

const ProfileContainerTop = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 10px 10px 0 0;
  padding: 15px 25px 0 26px;
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

const DisplayerContainer = styled.div`
  float: right;
`;

interface ProfileLinkProps {
  onClick: () => void;
}
const ProfileLink = styled(WelcomeLabel)<ProfileLinkProps>`
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

const BrandAndBalance = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 20px;
  font-size: 24px;
  min-width: 400px;
  color: ${({ theme }) => theme.popoverSubWalletText};
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

const Brand = styled.div`
  padding-left: 5px;
`;

const Balancex = styled.div`
  text-align: right;
  opacity: 0.75;
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

interface WalletActionIconProps {
  img: string;
}
const WalletActionIcon = styled.div<WalletActionIconProps>`
  ${(props: any) => `background:url(${props.img}) no-repeat center center; `}
  background-color: ${(props: any) => props.theme.secondary};
  margin: 0 auto;
  border-radius: 50%;
  background-size: 60px;
  width: 80px;
  height: 80px;
`;

interface ButtonSignupProps {
  theme: Theme & { loginRegisterBtn: string; loginRegisterBtnText: string };
}
const ButtonSignup = styled.div<ButtonSignupProps>`
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

type Props = {
  anchorEl: null | EventTarget;
  appHistory: {
    push: (path: string) => void;
  };
  handleClick: (e: MouseEvent) => void;
};
const UserProfile = ({ anchorEl, appHistory, handleClick }: Props) => {
  const account = useSelector((state) => state.account);
  const wallet = useSelector((state: any) => state.wallet);
  const game = useSelector((state: any) => state.game);

  const hasTransferProvider =
    Object.values(game.providerList).filter(
      (item: any) => item.transferwallet === true
    ).length > 0;

  const handleBalanceClick = (e: MouseEvent) => {
    handleClick(e);
  };
  const handlePush = (path: string) => {
    appHistory.push(path);
  };
  return (
    <ProfileContainer
      src={process.env.PUBLIC_URL + `/assets/images/wapp/home-profile.png`}
    >
      <ProfileContainerTop>
        {(() => {
          if (account.token != null) {
            return (
              <>
                <WelcomeLabel>
                  {i18n.t("wap.main.home.profile.welcomeBack")}
                </WelcomeLabel>
                <WelcomeUsernameLabel>
                  {account.info.member_username}(VIP
                  {account.info.member_level_id})
                </WelcomeUsernameLabel>
              </>
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
          <ProfileLink onClick={() => handlePush("/profile")}>
            {i18n.t("wap.main.home.profile.profile")}
          </ProfileLink>
        )}
      </ProfileContainerTop>

      <ProfileContainerBottom>
        <BalanceContainer>
          {(() => {
            if (account.token != null) {
              return (
                <>
                  <>
                    <BalanceAmount
                      onClick={(e) => {
                        handleBalanceClick(e);
                      }}
                    >
                      {wallet.mainSymbol}
                      {Common.formatNumberWithThousand(
                        wallet.mainBalance +
                          game.providerList
                            .filter(
                              (item) =>
                                item.status === 0 &&
                                item.transferwallet === true
                            )
                            .reduce((a, v) => (a = a + v.balance), 0)
                      )}
                    </BalanceAmount>
                    <CustomPopover
                      open={!!anchorEl}
                      anchorEl={anchorEl}
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
                              {wallet.mainSymbol +
                                Common.formatNumberWithThousand(
                                  wallet.mainBalance +
                                    game.providerList
                                      .filter(
                                        (item) =>
                                          item.status === 0 &&
                                          item.transferwallet === true
                                      )
                                      .reduce((a, v) => (a = a + v.balance), 0)
                                )}
                            </Textfit>
                          </div>
                        </BrandAndBalanceButBigger>
                      </div>
                      {SortedMenuList.map((item, key) => {
                        return (
                          <GameType key={key}>
                            <GameTypeName>{i18n.t(item.title)}</GameTypeName>
                            {game.homePageGameList
                              .filter((game) => {
                                return (
                                  (item.gameType.indexOf(game.type) >= 0 &&
                                    game.type !== GameTypeEnum.RNGSPORTS) ||
                                  (game.type === GameTypeEnum.RNGSPORTS &&
                                    game.abbreviation === "PPTF")
                                );
                              })
                              .map((brand, index) => {
                                return game.providerList
                                  .filter((item) => {
                                    return (
                                      item.abbreviation === brand.abbreviation
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
                                            ? i18n.t("transfer.maintenance")
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
                  </>
                </>
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
                  handlePush("/vip");
                }}
              >
                <WalletActionIcon
                  img={
                    process.env.PUBLIC_URL + `/assets/images/wapp/home-vip.png`
                  }
                ></WalletActionIcon>
                VIP
              </WalletActionLI>
            )}
            <WalletActionLI onClick={() => handlePush("/deposit")}>
              <WalletActionIcon
                img={
                  process.env.PUBLIC_URL +
                  `/assets/images/wapp/icon-deposit.png`
                }
              ></WalletActionIcon>
              {i18n.t("common.deposit")}
            </WalletActionLI>
            {hasTransferProvider && (
              <WalletActionLI onClick={() => handlePush("/transfer")}>
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
                  wallet.bankCardList != null &&
                  wallet.bankCardList.length === 0 &&
                  config.features.AddCard_NotAllowedEditDelete
                ) {
                  this.props.alert(
                    "",
                    i18n.t("disabledAddCard.title") +
                      " " +
                      i18n.t("disabledAddCard.description")
                  );
                } else {
                  handlePush("/withdrawal");
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
  );
};

export default React.memo(UserProfile);

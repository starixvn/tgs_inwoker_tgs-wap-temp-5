import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import styled from "styled-components";
import i18n from "@/utils/i18n";
import config from "@/config/config";

const StyledDialog = withStyles({
  root: {
    "& .MuiDialog-paperWidthSm": {
      width: "100%",
      height: "100%",
      maxWidth: "750px",
      maxHeight: "100%",
      margin: 0,
    },
  },
  paper: {
    backgroundColor: "rgba(0,0,0,0.8)",
  },
})(Dialog);
const MenuContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const MenuItemWrap = styled.div`
  margin-top: 50%;
`;

const Menuitem = styled.div`
  width: calc(100% / 3);
  float: left;
  margin-top: 50px;
`;
const MenuLabel = styled.div`
  font-size: 22px;
  text-align: center;
  color: #5ceeff;
  margin-top: 10px;
`;

interface MenuImageProps {
  img: string;
}
const MenuImage = styled.div<MenuImageProps>`
  width: 100px;
  height: 100px;
  background-color: #383737;
  border-radius: 50%;
  background-image: url(${(props: any) => props.img});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 68px;
  margin: 0 auto;

  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: solid 2px #5ceeff;
`;

const ButtonCloseMenu = styled.div`
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/icon-menu-close.png`})
    no-repeat;
  background-size: 68px;
  width: 68px;
  height: 68px;
  margin: 50px auto;
`;

type Props = {
  isOpen: boolean;
  noBandCard: boolean;
  hasTransferProvider: boolean;
  handleSelect: (selected: string) => void;
  handleClose: () => void;
  handleAlert: (title: string, message: string) => void;
};
const UserMenu = ({
  isOpen,
  noBandCard,
  hasTransferProvider,
  handleSelect,
  handleClose,
  handleAlert,
}: Props) => {
  return (
    <StyledDialog open={isOpen} onClose={handleClose}>
      <MenuContainer>
        <MenuItemWrap>
          <Menuitem onClick={() => handleSelect("/deposit")}>
            <MenuImage
              img={
                process.env.PUBLIC_URL +
                `/assets/images/wapp/icon-menu-deposit.png`
              }
            ></MenuImage>
            <MenuLabel>{i18n.t("wap.main.menuDrawer.deposit")}</MenuLabel>
          </Menuitem>

          {hasTransferProvider && !config.features.NewTransferUI && (
            <Menuitem onClick={() => handleSelect("/transfer")}>
              <MenuImage
                img={
                  process.env.PUBLIC_URL +
                  `/assets/images/wapp/icon-menu-transfer.png`
                }
              ></MenuImage>
              <MenuLabel>{i18n.t("wap.main.menuDrawer.transfer")}</MenuLabel>
            </Menuitem>
          )}

          <Menuitem
            onClick={() => {
              if (noBandCard) {
                handleAlert(
                  "",
                  i18n.t("disabledAddCard.title") +
                    " " +
                    i18n.t("disabledAddCard.description")
                );
              } else {
                handleSelect("/withdrawal");
              }
            }}
          >
            <MenuImage
              img={
                process.env.PUBLIC_URL +
                `/assets/images/wapp/icon-menu-withdrawal.png`
              }
            ></MenuImage>
            <MenuLabel>{i18n.t("wap.main.menuDrawer.withdrawal")}</MenuLabel>
          </Menuitem>

          <Menuitem onClick={() => handleSelect("/report/2")}>
            <MenuImage
              img={
                process.env.PUBLIC_URL +
                `/assets/images/wapp/icon-menu-report.png`
              }
            ></MenuImage>
            <MenuLabel>{i18n.t("wap.main.account.betReport")}</MenuLabel>
          </Menuitem>

          {/* <Menuitem onClick={() => handleSelect("/report/2")}>
                <MenuImage img={IconMenuReport2PNG}></MenuImage>
                <MenuLabel>{i18n.t("wap.main.menuDrawer.betReport")}</MenuLabel>
              </Menuitem>
            */}
          <Menuitem onClick={() => handleSelect("/report/3")}>
            <MenuImage
              img={
                process.env.PUBLIC_URL +
                `/assets/images/wapp/icon-menu-report.png`
              }
            ></MenuImage>
            <MenuLabel>
              {i18n.t("wap.main.menuDrawer.withdrawalReport")}
            </MenuLabel>
          </Menuitem>
          <Menuitem onClick={() => handleSelect("/report/4")}>
            <MenuImage
              img={
                process.env.PUBLIC_URL +
                `/assets/images/wapp/icon-menu-report.png`
              }
            ></MenuImage>
            <MenuLabel>{i18n.t("wap.main.menuDrawer.depositReport")}</MenuLabel>
          </Menuitem>
          <Menuitem
            onClick={() => {
              if (noBandCard) {
                handleAlert("", i18n.t("card.toEdit"));
              } else {
                handleSelect("/card");
              }
            }}
          >
            <MenuImage
              img={
                process.env.PUBLIC_URL +
                `/assets/images/wapp/icon-menu-card.png`
              }
            ></MenuImage>
            <MenuLabel>{i18n.t("wap.main.menuDrawer.bankCard")}</MenuLabel>
          </Menuitem>

          <Menuitem onClick={() => handleSelect("/inbox")}>
            <MenuImage
              img={
                process.env.PUBLIC_URL +
                `/assets/images/wapp/icon-menu-inbox.png`
              }
            ></MenuImage>
            <MenuLabel>{i18n.t("wap.main.menuDrawer.inbox")}</MenuLabel>
          </Menuitem>
        </MenuItemWrap>
        <ButtonCloseMenu onClick={handleClose} />
      </MenuContainer>
    </StyledDialog>
  );
};

export default UserMenu;

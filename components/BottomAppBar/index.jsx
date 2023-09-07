import * as React from "react";
import i18n from "../../../../utils/i18n";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import styled from "styled-components";

const StyledBottomAppBar = withStyles({
  root: {
    height: "90px",
    top: "auto",
    bottom: 0,
  },
})(AppBar);

const CustomBottomNavigation = withStyles((theme) => {
  const { mainGradient, main } = theme.palette.primary;
  return {
    root: {
      backgroundImage:
        "linear-gradient(to top, " + mainGradient + ", " + main + ")",
    },
  };
})(BottomNavigation);

const CustomBottomNavigationAction = withStyles(() => {
  return {
    root: {
      width: "570px",
      height: "90px",
      "&.Mui-selected": {
        "& .MuiBottomNavigationAction-wrapper>div": {
          backgroundColor: "#fde73f",
        },
      },
    },
    label: {
      fontSize: "21px",
      marginTop: "5px",
      //@ts-ignore
      color: (props) => (props.selected ? "#d09f58" : "#ffffff"),

      "&.Mui-selected": {
        fontSize: "21px !important",
        marginTop: "5px",
        color: "#fde73f",
      },
    },
  };
})(BottomNavigationAction);

const BottomNavigatorFrame = styled.div`
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: center;

  mask-image: url(${(props) => props.src});
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: auto 40px;
  mask-mode: alpha;
  background-blend-mode: multiply;
  background-color: #fff;
  width: 60px;
  height: 50px;
`;
const BottomNavigatorPlus = styled.div`
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/icon-plus.png`})
    no-repeat center;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 70px 70px;
  background-color: ${(props) => props.theme.secondary};
  border-radius: 50%;
  width: 70px;
  height: 70px;
`;

const BottomAppBar = ({ handleChangeSelection, toggleMenu, currentPage }) => {
  return (
    <StyledBottomAppBar position="fixed" color="default">
      <CustomBottomNavigation
        value={currentPage}
        showLabels
        style={{ width: "750px", height: "90px" }}
      >
        <CustomBottomNavigationAction
          label={i18n.t("wap.main.homePage")}
          value="/main/home"
          onClick={() => handleChangeSelection("/main/home")}
          icon={
            <BottomNavigatorFrame
              src={process.env.PUBLIC_URL + `/assets/images/wapp/icon-home.png`}
            />
          }
        />
        <CustomBottomNavigationAction
          label={i18n.t("wap.main.promo")}
          value="/promotion-list"
          onClick={() => handleChangeSelection("/promotion-list")}
          icon={
            <BottomNavigatorFrame
              src={
                process.env.PUBLIC_URL +
                `/assets/images/wapp/icon-promotion.png`
              }
            />
          }
        />
        <CustomBottomNavigationAction
          onClick={toggleMenu}
          label=""
          icon={<BottomNavigatorPlus selected={currentPage === "/"} />}
        />

        <CustomBottomNavigationAction
          onClick={() => handleChangeSelection("/main/support")}
          value="/customer-service"
          label={i18n.t("wap.main.cs")}
          icon={
            <BottomNavigatorFrame
              src={process.env.PUBLIC_URL + `/assets/images/wapp/icon-cs.png`}
            />
          }
        />
        <CustomBottomNavigationAction
          label={i18n.t("wap.main.my")}
          value="/main/profile"
          onClick={() => handleChangeSelection("/main/profile")}
          icon={
            <BottomNavigatorFrame
              src={
                process.env.PUBLIC_URL + `/assets/images/wapp/icon-profile.png`
              }
            />
          }
        />
      </CustomBottomNavigation>
    </StyledBottomAppBar>
  );
};

export default BottomAppBar;

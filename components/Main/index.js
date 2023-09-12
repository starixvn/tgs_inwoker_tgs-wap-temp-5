import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import My from "./My";
import Home from "./Home";
import Support from "./Support";
import Download from "../Download";
import config from "../../../../config/config";
import BottomAppBar from "@/components/Wap/components/BottomAppBar";
import UserMenu from "@/components/Wap/components/UserMenu";

class Main extends Component {
  state = {
    currentPage: this.props.history.location.pathname,
    showMenu: false,
  };
  // GetSupportUrl = (userid, name, question) => {
  //   var response = SupportService.GetLiveSupport(
  //     userid,
  //     name,
  //     question,
  //     document.URL,
  //     document.referrer
  //   )
  //   if (response.IsSuccess) {
  //     window.open(response.data.online, "_blank")

  //   } else {
  //     this.props.alert("", response.info);

  //   }
  // };
  handleContactCs = () => {
    if (this.props.account.token == null) {
      // AppHistory.push( value);
      this.props.GetSupportUrl("", "", "", "");
    } else {
      this.props.GetSupportUrl(
        "",
        this.props.account.info.member_username,
        "",
        this.props.account.info.member_email
      );
    }
  };

  handleChangeSelection = (value) => {
    if (value === "/main/profile" && this.props.account.token == null) {
      this.props.appHistory.push("/login");
    } else {
      //if (value === "/customer-service") {
      //  if (this.props.account.token == null) {
      //    // AppHistory.push( value);
      //    this.props.GetSupportUrl("", "", "");
      //  } else {
      //    this.props.GetSupportUrl(
      //      "",
      //      this.props.account.info.member_username,
      //      ""
      //    );
      //  }
      // } else

      this.setState({
        ...this.state,
        currentPage: value,
      });
      this.props.appHistory.push(value);
    }
  };

  toggleMenu = () => {
    if (this.props.account.token == null) {
      this.props.appHistory.push("/login");
    } else {
      this.setState({ ...this.state, showMenu: true });
    }
  };

  handleCloseMenu = () => {
    this.setState({ ...this.state, showMenu: false });
  };

  handleAlert = (title, message) => {
    this.props.alert(title, message);
  };

  MainComponentRenderer = (page) => {
    switch (page) {
      case "main":
        return (
          <Home
            navigate={this.props.navigate}
            appHistory={this.props.appHistory}
            alert={this.props.alert}
          />
        );

      case "profile":
        return (
          <My
            navigate={this.props.navigate}
            appHistory={this.props.appHistory}
            alert={this.props.alert}
          />
        );

      case "support":
        return (
          <Support
            alert={this.props.alert}
            navigate={this.props.navigate}
            handleContactCs={this.handleContactCs}
          />
        );

      case "download":
        if (config.features.HaveDownloadFeature)
          return <Download alert={this.props.alert} />;
        else this.props.navigate("/");
        break;

      default:
        return (
          <Home
            navigate={this.props.navigate}
            appHistory={this.props.appHistory}
            alert={this.props.alert}
          />
        );
    }
  };

  render() {
    const { page } = this.props.match.params;

    const noBandCard =
      this.props.wallet.bankCardList != null &&
      this.props.wallet.bankCardList.length === 0 &&
      config.features.AddCard_NotAllowedEditDelete;

    const hasTransferProvider =
      Object.values(this.props.game.providerList).filter(
        (item) => item.transferwallet === true
      ).length > 0;

    return (
      <>
        {/* Mobile Main Content */}
        {this.MainComponentRenderer(page)}

        {/* User Menu */}
        <UserMenu
          isOpen={this.state.showMenu}
          noBandCard={noBandCard}
          hasTransferProvider={hasTransferProvider}
          handleClose={this.handleCloseMenu}
          handleSelect={this.handleChangeSelection}
          handleAlert={this.handleAlert}
        />

        {/* Bottom Bar */}
        <BottomAppBar
          currentPage={this.state.currentPage}
          handleChangeSelection={this.handleChangeSelection}
          toggleMenu={this.toggleMenu}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    account: state.account,
    game: state.game,
    wallet: state.wallet,
  };
};

export default connect(mapStateToProps, null)(withRouter(Main));

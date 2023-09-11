import styled from "styled-components";
import i18n from "../../../../utils/i18n";
import React from "react";
import { StyledDialog } from "./StyledDialog";

const DialogMessage = styled.div`
  font-size: 26px;
  margin: 20px 45px;
  color: #4a4a4a;
  line-height: 1.8em;
  text-align: center;
`;

const ButtonConfirm = styled.div`
  width: 250px;
  height: 90px;
  border-radius: 20px;

  font-size: 34px;

  text-align: center;

  padding-top: 24px;

  margin: 10px auto;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
  color: #ffffff;
`;

const ButtonCancel = styled(ButtonConfirm)``;

// interface IProps {
//   isOpen: boolean;
//   handleClose: () => void;
//   handleClickUrl: () => void;
// }

const PopupModal = ({ isOpen, handleClose, handleClickUrl }) => {
  return (
    <StyledDialog onClose={handleClose} open={isOpen}>
      <DialogMessage>{i18n.t("common.msgPopupBlocker")}</DialogMessage>
      <ButtonCancel onClick={handleClickUrl} style={{ float: "left" }}>
        {i18n.t("common.confirm")}
      </ButtonCancel>
      <ButtonCancel onClick={handleClose} style={{ float: "right" }}>
        {i18n.t("common.cancel")}
      </ButtonCancel>
    </StyledDialog>
  );
};

export default PopupModal;

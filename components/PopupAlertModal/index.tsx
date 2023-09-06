import i18n from "../../../../utils/i18n";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Dialog";
import styled from "styled-components";

const StyledModal = withStyles((theme) => ({
  paper: {
    borderRadius: "50px",
    fontSize: "28px",
    color: "#666666",
    padding: "30px",
    width: "500px",
    maxWidth: "690px",

    display: "block",
  },
}))(Modal);

const DialogTitle = styled.div`
  font-size: 36px;
  font-weight: 600;
  margin: 30px 0 20px 45px;
  color: #4a4a4a;
`;
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

interface IModalButtonsProps {
  handleClose: () => void;
  message: string;
  action: string;
}

const ModalButtons = ({ handleClose, message, action }: IModalButtonsProps) => {
  if (message === "无法连接，请检查您的网络") {
    return (
      <ButtonConfirm onClick={() => window.location.reload()}>
        {i18n.t("common.reload")}
      </ButtonConfirm>
    );
  } else {
    return (
      <div>
        <ButtonConfirm onClick={handleClose}>
          {i18n.t("common.confirm")}
        </ButtonConfirm>

        {action && <div onClick={handleClose}>{action}</div>}
      </div>
    );
  }
};

interface IModalProps {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  message: string;
  action: string;
}

const PopupAlertModal = ({
  isOpen,
  handleClose,
  title,
  message,
  action,
}: IModalProps) => {
  return (
    <StyledModal onClose={handleClose} open={isOpen}>
      <DialogTitle>{title}</DialogTitle>
      <DialogMessage>{message}</DialogMessage>
      <ModalButtons
        handleClose={handleClose}
        message={message}
        action={action}
      />
    </StyledModal>
  );
};

export default PopupAlertModal;

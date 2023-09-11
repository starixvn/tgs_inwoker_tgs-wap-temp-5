import { withStyles } from "@material-ui/core/styles";
import { Dialog } from "@material-ui/core";

export const StyledDialog = withStyles((theme) => ({
  paper: {
    borderRadius: "50px",
    fontSize: "28px",
    color: "#666666",
    padding: "30px",
    width: "600px",
    maxWidth: "690px",
    display: "block",
  },
}))(Dialog);

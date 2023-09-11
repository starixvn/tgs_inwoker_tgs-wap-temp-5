import { Dialog } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

export const StyledDialog = withStyles((theme) => ({
  paper: {
    borderRadius: "50px",
    fontSize: "28px",
    color: "#666666",
    padding: "30px",
    width: "500px",
    maxWidth: "690px",
    display: "block",
  },
}))(Dialog);

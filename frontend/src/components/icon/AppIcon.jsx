import { ReactComponent as Logo } from "../../assets/logo.svg";
import { SvgIcon } from "@mui/material";

function AppIcon(props) {
  return (
    <SvgIcon {...props}>
      <Logo />
    </SvgIcon>
  );
}

export default AppIcon;

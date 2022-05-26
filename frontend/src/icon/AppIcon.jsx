import { SvgIcon } from "@mui/material";
import { ReactComponent as Logo } from "./logo.svg";

function AppIcon(props) {
  return (
    <SvgIcon {...props}>
      <Logo />
    </SvgIcon>
  );
}

export default AppIcon;

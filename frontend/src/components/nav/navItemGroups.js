import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import HistoryEduOutlined from "@mui/icons-material/HistoryEduOutlined";
import NewspaperOutlined from "@mui/icons-material/NewspaperOutlined";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";

const navItemsGroup = [
  { title: "Discover", link: "/home", icon: <VisibilityOutlined /> },
  { title: "Profile", link: "/profile", icon: <AccountCircleOutlined /> },
  {
    title: "Write Blog",
    link: "/write",
    icon: <HistoryEduOutlined />,
  },
  {
    title: "Your Blogs",
    link: "/personal-blogs",
    icon: <NewspaperOutlined />,
  },
];

export { navItemsGroup };

import {
  RiHome5Line as DiscoverIcon,
  RiUser6Line as UserIcon,
  RiNewspaperLine as PersonalBlogIcon,
  RiPenNibLine as WriteIcon,
} from "react-icons/ri";

const navItemsGroup = [
  { title: "Discover", link: "/home", icon: <DiscoverIcon fontSize={24} /> },
  { title: "Profile", link: "/profile", icon: <UserIcon fontSize={24} /> },
  {
    title: "Write Blog",
    link: "/write",
    icon: <WriteIcon fontSize={24} />,
  },
  {
    title: "Your Blogs",
    link: "/personal-blogs",
    icon: <PersonalBlogIcon fontSize={24} />,
  },
];

export { navItemsGroup };

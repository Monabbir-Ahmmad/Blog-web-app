import {
  Add,
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatColorFill,
  FormatColorText,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatStrikethrough,
  FormatUnderlined,
  Image,
  InsertLink,
  LinkOff,
  Looks3,
  LooksOne,
  LooksTwo,
  Subscript,
  Superscript,
  VideoLibrary,
} from "@mui/icons-material";

const iconList = {
  bold: <FormatBold />,
  italic: <FormatItalic />,
  strikethrough: <FormatStrikethrough />,
  underline: <FormatUnderlined />,
  headingOne: <LooksOne />,
  headingTwo: <LooksTwo />,
  headingThree: <Looks3 />,
  blockquote: <FormatQuote />,
  superscript: <Superscript />,
  subscript: <Subscript />,
  alignLeft: <FormatAlignLeft />,
  alignCenter: <FormatAlignCenter />,
  alignRight: <FormatAlignRight />,
  orderedList: <FormatListNumbered />,
  unorderedList: <FormatListBulleted />,
  link: <InsertLink />,
  unlink: <LinkOff />,
  image: <Image />,
  video: <VideoLibrary />,
  add: <Add />,
  color: <FormatColorText />,
  bgColor: <FormatColorFill />,
};

const Icon = (props) => {
  const { icon } = props;
  return iconList[icon];
};

export default Icon;

import React from "react";
import { useSelected, useFocused } from "slate-react";
import "./Image.css";

const Image = ({ attributes, element, children }) => {
  const { url, width, height } = element;
  const selected = useSelected();
  const focused = useFocused();
  return (
    <div
      {...attributes}
      className="element-image"
      style={{
        boxShadow: selected && focused && "0 0 3px 3px lightgray",
      }}
    >
      <div
        contentEditable={false}
        style={{
          width: width,
          height: height,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img alt={element.alt} src={url} />
      </div>
      {children}
    </div>
  );
};
export default Image;

import React, { useRef, useState } from "react";
import "./ColorPicker.css";
import { colors } from "./defaultColors.js";
import { addMarkData } from "../../utils/SlateUtilityFunctions.js";
import { Transforms } from "slate";
import usePopup from "../../utils/usePopup";
import { ReactEditor } from "slate-react";
import { Check } from "@mui/icons-material";
import Icon from "../../common/Icon";

const ColorPicker = ({ format, editor }) => {
  const [selection, setSelection] = useState();
  const [hexValue, setHexValue] = useState("");
  const [validHex, setValidHex] = useState();
  const colorPickerRef = useRef(null);
  const [showOptions, setShowOptions] = usePopup(colorPickerRef);

  const isValideHexSix = new RegExp("^#[0-9A-Za-z]{6}");
  const isValideHexThree = new RegExp("^#[0-9A-Za-z]{3}");

  const changeColor = (e) => {
    const clickedColor = e.target.getAttribute("data-value");
    selection && Transforms.select(editor, selection);

    addMarkData(editor, { format, value: clickedColor });
    ReactEditor.focus(editor);
    Transforms.move(editor, {
      distance: 1,
    });
    setShowOptions(false);
  };
  const toggleOption = () => {
    setSelection(editor.selection);
    setShowOptions((prev) => !prev);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validHex) return;
    selection && Transforms.select(editor, selection);

    addMarkData(editor, { format, value: hexValue });
    setShowOptions(false);
    setValidHex("");
    setHexValue("");
  };
  const handleHexChange = (e) => {
    e.preventDefault();
    const newHex = e.target.value;
    setValidHex(isValideHexSix.test(newHex) || isValideHexThree.test(newHex));
    setHexValue(newHex);
  };
  return (
    <div className="color-picker popup-wrapper" ref={colorPickerRef}>
      <button
        style={{
          color: "black",
          opacity: "1",
        }}
        className={showOptions ? "clicked" : ""}
        onClick={toggleOption}
      >
        <Icon icon={format} />
      </button>
      {showOptions && (
        <div className="popup">
          <div className="color-options">
            {colors.map((color, index) => {
              return (
                <div
                  key={index}
                  data-value={color}
                  onClick={changeColor}
                  className="option"
                  style={{ background: color }}
                ></div>
              );
            })}
          </div>
          <p style={{ textAlign: "center", opacity: "0.7", width: "100%" }}>
            OR
          </p>
          <form onSubmit={handleFormSubmit}>
            <div
              className="hexPreview"
              style={{ background: validHex ? hexValue : "#000000" }}
            ></div>
            <input
              type="text"
              placeholder="#000000"
              value={hexValue}
              onChange={handleHexChange}
              style={{
                border:
                  validHex === false ? "1px solid red" : "1px solid lightgray",
              }}
            />
            <button style={{ color: validHex ? "green" : "" }} type={"submit"}>
              <Check />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;

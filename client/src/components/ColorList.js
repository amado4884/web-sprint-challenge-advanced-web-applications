import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useInput } from "../hooks/useInput";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors }) => {
  const authAxios = useAuth("token", false);
  const [newColorName, setNewColorName, changeNewColorName] = useInput("");
  const [newColorHex, setNewColorHex, changeNewColorHex] = useInput("#");
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    authAxios.put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit);
    updateColors(
      colors.map((color) => {
        if (color.id === colorToEdit.id) {
          return colorToEdit;
        } else {
          return color;
        }
      })
    );
  };

  const deleteColor = (color) => {
    authAxios.delete(`http://localhost:5000/api/colors/${color.id}`);
    updateColors(colors.filter((colorr) => colorr.id !== color.id));
  };

  const addColor = (e) => {
    e.preventDefault();
    const newC = { color: newColorName, code: { hex: newColorHex }, id: Date.now() };

    authAxios.post(`http://localhost:5000/api/colors/`, newC);
    updateColors([...colors, newC]);
    setNewColorName("");
    setNewColorHex("#");
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div className="color-box" style={{ backgroundColor: color.code.hex }} />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) => setColorToEdit({ ...colorToEdit, color: e.target.value })}
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <form onSubmit={addColor}>
        <legend>add color</legend>
        <label>
          color name:
          <input onChange={changeNewColorName} value={newColorName} />
        </label>
        <label>
          hex code:
          <input onChange={changeNewColorHex} value={newColorHex} />
        </label>
        <div className="button-row">
          <button type="submit">add</button>
          <button onClick={() => addColor()}>cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ColorList;

import React from "react";
import PlaceholderImage from "../config/PlaceholderImage";

export default function ItemAvatar({ photo, name }) {
  return <img title={name} src={photo || PlaceholderImage} alt={name} style={{ width: 240, height: "auto" }} />;
}

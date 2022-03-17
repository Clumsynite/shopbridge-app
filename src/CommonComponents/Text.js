import React from "react";

export default function Text({ bold, size, style, fontWeight, children, ...rest }) {
  return (
    <div style={{ fontSize: size, fontWeight: fontWeight || bold ? "bold" : "normal", ...style }} {...rest}>
      {children}
    </div>
  );
}

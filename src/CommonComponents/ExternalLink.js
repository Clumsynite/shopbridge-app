import React from "react";

export default function ExternalLink({ to, name, icon, title, dark, ...rest }) {
  return (
    <a href={to} target="_blank" rel="noreferrer" {...rest} title={title}>
      {icon}
      {name}
    </a>
  );
}

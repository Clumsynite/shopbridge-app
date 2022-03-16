import React from "react";
import { HeartFilled } from "@ant-design/icons";

import { Layout } from "antd";
import { ExternalLink } from "../CommonComponents";
import { LIGHT_RED } from "../config/colors";

const { Footer: AntFooter } = Layout;

export default function Footer() {
  return (
    <AntFooter style={{ textAlign: "center", backgroundColor: "rgba(255, 255, 255, 0.3)" }}>
      Made with <HeartFilled style={{ color: LIGHT_RED }} /> by{" "}
      <ExternalLink name="Rishabh Pathak" title="Link to my Github Profile" to="https://github.com/Clumsynite" />
    </AntFooter>
  );
}

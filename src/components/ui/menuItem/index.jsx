import React, { useState } from "react";
import * as styles from "./index.module.scss";
import { Menu as MenuFromAntDesign } from "antd";

export default function MenuItem(props) {
  const MenuItem = (props) => (
    <MenuFromAntDesign.Item label="asdasd" items={props.items}>
      {props.children}
    </MenuFromAntDesign.Item>
  );
}

import React, { useState } from "react";
import * as styles from "./index.module.scss";
import { Menu } from "antd";

export default function MenuItem(props) {
  return (
    <Menu.Item className={styles.menuItem} {...props}>
      {props.children}
    </Menu.Item>
  );
}

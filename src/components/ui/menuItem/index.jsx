import React, {useState} from "react";
import * as styles from "./index.module.scss";
import {Menu as MenuFromAntDesign} from "antd";

export default function MenuItem(props) {

  const MenuItem = (props) => (
    <MenuFromAntDesign.Item label='asdasd' {...props}>
      {props.children}
    </MenuFromAntDesign.Item> );
}

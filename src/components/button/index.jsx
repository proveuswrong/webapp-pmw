import React, {useState} from "react";
import * as styles from "./index.module.scss";

export default function Button(props) {

  return <button className={styles.button} {...props}>{props.children}</button>
}

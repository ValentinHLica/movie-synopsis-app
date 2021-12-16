import React, { ChangeEventHandler, LegacyRef } from "react";

import { Size } from "@interface/UI/button";

import styles from "@styles/components/UI/input.module.scss";

type Props = {
  type?: "text" | "number";
  placeholder?: string;
  inputRef?: LegacyRef<HTMLInputElement>;
  size?: Size;
  readOnly?: boolean;
  value?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  invisible?: boolean;
};

const Input: React.FC<Props> = ({
  type = "text",
  placeholder,
  inputRef,
  size = "md",
  readOnly = false,
  value,
  onChange,
  invisible,
}) => {
  const attributes = {
    className: `${styles.container} ${styles[`container__${size}`]} ${
      invisible ? styles.container__invisible : ""
    } input`,
    type,
    placeholder,
    ref: inputRef,
    readOnly,
    value,
    onChange,
  };

  return <input {...attributes} />;
};

export default Input;

import React, { ChangeEventHandler, LegacyRef } from "react";

import styles from "@styles/components/UI/input.module.scss";

type Props = {
  type?: "text" | "number" | "time";
  placeholder?: string;
  inputRef?: LegacyRef<HTMLInputElement>;
  readOnly?: boolean;
  value?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  invisible?: boolean;
  className?: string;
};

const Input: React.FC<Props> = ({
  type = "text",
  placeholder,
  inputRef,
  readOnly = false,
  value,
  onChange,
  invisible,
  className = "",
}) => {
  const attributes = {
    className: `${styles.container} ${
      invisible ? styles.container__invisible : ""
    } input ${className}`,
    type,
    placeholder,
    ref: inputRef,
    readOnly,
    value,
    onChange,
    ...(() => {
      if (type === "time") {
        return {
          step: 2,
          min: 0,
        };
      }

      return {};
    })(),
  };

  return <input {...attributes} />;
};

export default Input;

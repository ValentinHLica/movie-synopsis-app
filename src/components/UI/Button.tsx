import React from "react";

import { Size, Type } from "@interface/UI/button";

import Spinner from "./Spinner";

import styles from "@styles/components/UI/button.module.scss";

type Props = {
  url?: string;
  className?: string;
  size?: Size;
  type?: Type;
  onClick?: () => void;
  loading?: boolean;
  icon?: JSX.Element | null;
  disabled?: boolean;
};

const Button: React.FC<Props> = ({
  url,
  className = "",
  children,
  size = "md",
  type = "primary",
  onClick,
  loading,
  icon = null,
  disabled,
}) => {
  const attributes = {
    className: `${styles.container} ${className} ${
      styles[`container__${size}`]
    } ${styles[`container__${type}`]} ${!url ? styles.container__btn : ""}`,
    disabled,
  };

  return (
    <button
      {...attributes}
      onClick={() => {
        if (onClick && !disabled) {
          onClick();
        }
      }}
    >
      {loading && <Spinner size="sm" className={styles.container__loading} />}

      {!loading && icon}

      {children}
    </button>
  );
};

export default Button;

import React from "react";
import { Link } from "react-router-dom";

import Spinner from "./Spinner";

import { Size, Type } from "@interface/UI/button";

import styles from "@styles/components/UI/button.module.scss";

type Props = {
  url?: string;
  className?: string;
  size?: Size;
  type?: Type;
  onClick?: () => void;
  loading?: boolean;
  icon?: JSX.Element | null;
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
}) => {
  const attributes = {
    className: `${styles.container} ${className} ${
      styles[`container__${size}`]
    } ${styles[`container__${type}`]} ${!url ? styles.container__btn : ""}`,
  };

  const content = children && (
    <p
      className={`${styles.children} ${
        icon || loading ? styles.children_with_icon : ""
      }`}
    >
      {children}
    </p>
  );

  if (url) {
    return (
      <Link to={url} {...attributes}>
        {icon}
        {content}
      </Link>
    );
  }

  return (
    <button {...attributes} onClick={onClick}>
      {loading && <Spinner size="sm" className={styles.container__loading} />}
      {!loading && icon}
      {content}
    </button>
  );
};

export default Button;

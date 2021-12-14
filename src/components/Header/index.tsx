import React from "react";

import { BreadCrumb } from "@ui";

import { NavItem } from "@interface/UI/breadCrumb";

import styles from "@styles/components/Header/index.module.scss";

type Props = {
  nav?: NavItem[];
};

const Header: React.FC<Props> = ({ nav }) => {
  return (
    <header className={styles.header}>
      <BreadCrumb nav={nav} />
    </header>
  );
};

export default Header;

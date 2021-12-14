import React, { Fragment } from "react";

import Header from "./Header";

type Props = {
  nav?: {
    text: string;
    url?: string;
    onClick?: () => void;
  }[];
};

const Layout: React.FC<Props> = ({ nav, children }) => {
  return (
    <Fragment>
      <Header nav={nav} />

      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;

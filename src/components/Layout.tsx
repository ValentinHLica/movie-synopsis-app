import React, { Fragment } from "react";

import Header from "./Header";
import { Spinner } from "@ui";

type Props = {
  nav?: {
    text: string;
    url?: string;
    onClick?: () => void;
  }[];
  loading?: boolean;
};

const Layout: React.FC<Props> = ({ nav, loading, children }) => {
  return (
    <Fragment>
      <Header nav={nav} />

      <main>{loading ? <Spinner /> : children}</main>
    </Fragment>
  );
};

export default Layout;

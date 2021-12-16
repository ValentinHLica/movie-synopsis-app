import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";

import { NavItem } from "@interface/UI/breadCrumb";

import styles from "@styles/components/UI/bread-crumb.module.scss";

type Props = {
  nav?: NavItem[];
};

const BreadCrumb: React.FC<Props> = ({ nav }) => {
  const history = useHistory();

  return (
    <nav className={styles.container}>
      <ul className={styles.container__list}>
        <li
          className={styles.list__item}
          onClick={() => {
            if (nav) {
              history.push("/");
            }
          }}
        >
          Home
        </li>

        {nav &&
          nav.map((item, index) => {
            const { text, url, onClick } = item;

            return (
              <Fragment key={index}>
                <li className={styles.list__item}>/</li>
                <li
                  className={styles.list__item}
                  onClick={() => {
                    if (url) {
                      history.push(url);
                    } else {
                      if (onClick) {
                        onClick();
                      }
                    }
                  }}
                >
                  {text}
                </li>
              </Fragment>
            );
          })}
      </ul>
    </nav>
  );
};

export default BreadCrumb;
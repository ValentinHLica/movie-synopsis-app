import React, { Fragment, useEffect, useState } from "react";

import { TimeStamp as TimeStampType } from "@interface/movie";

import styles from "@styles/components/UI/tabs.module.scss";

type Props = {
  timestamps?: TimeStampType[];
  tabs: { text: string; content: JSX.Element }[];
};

const Tabs: React.FC<Props> = ({ timestamps, tabs }) => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  useEffect(() => {
    setCurrentTab(0);
  }, [timestamps]);

  return (
    <Fragment>
      <div className={styles.container}>
        <ul className={styles.container__tabs}>
          {tabs.map((tab, index) => (
            <li
              className={`${styles.tab} ${
                index === currentTab ? styles.tab__selected : ""
              }`}
              key={index}
              onClick={() => {
                setCurrentTab(index);
              }}
            >
              {tab.text}
            </li>
          ))}
        </ul>
      </div>

      {tabs[currentTab].content}
    </Fragment>
  );
};

export default Tabs;

import React, { useEffect, useRef, useState } from "react";

import Button from "./Button";

import { Size, Type } from "@interface/UI/button";

import styles from "@styles/components/UI/dropdown.module.scss";

type Props = {
  icon?: JSX.Element;
  text?: string;
  size?: Size;
  type?: Type;
  items: {
    icon?: JSX.Element;
    text: string | number;
    onClick: () => void;
  }[];
  onClick?: () => void;
};

const Dropdown: React.FC<Props> = ({
  icon,
  text,
  size = "md",
  type = "primary",
  items,
  onClick,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [itemIndex, setItemIndex] = useState<number | null>(null);

  useEffect(() => {
    if (type === "light") {
      setItemIndex(null);
    }
  }, [type]);

  useEffect(() => {
    const handleVisibility = (event: any) => {
      if (container.current && !container.current.contains(event.target)) {
        setVisible(false);
      }
    };

    window.addEventListener("click", handleVisibility);
    return () => {
      window.removeEventListener("click", handleVisibility);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={container}>
      <Button
        size={size}
        type={type}
        onClick={() => {
          setVisible(true);

          if (onClick) {
            onClick();
          }
        }}
        icon={icon}
      >
        {text}
      </Button>

      <ul
        className={`${styles.posts__controls} ${
          visible ? styles[`posts__controls__visible`] : ""
        }`}
      >
        {items.map((item, index) => {
          const { text, icon, onClick } = item;

          const indexing = itemIndex !== null && itemIndex === index;

          return (
            <li
              className={`${styles.controls__item} ${
                indexing ? styles.controls__item__selected : ""
              } ${styles[`controls__item__${size}`]}`}
              onClick={() => {
                setItemIndex(index);
                onClick();
              }}
              key={index}
            >
              {icon} {text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dropdown;

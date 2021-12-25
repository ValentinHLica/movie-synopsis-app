import React from "react";

import styles from "@styles/components/UI/text-area.module.scss";

type Props = {
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  elementRef?: React.LegacyRef<HTMLTextAreaElement>;
  value?: string | number | readonly string[];
  placeholder?: string;
  cols?: number;
  rows?: number;
};

const TextArea: React.FC<Props> = ({
  onChange,
  elementRef,
  value,
  placeholder,
  cols,
  rows,
}) => {
  return (
    <textarea
      className={styles.text_area}
      cols={cols ?? 30}
      rows={rows ?? 3}
      onChange={onChange}
      ref={elementRef}
      value={value}
      placeholder={placeholder}
    ></textarea>
  );
};

export default TextArea;

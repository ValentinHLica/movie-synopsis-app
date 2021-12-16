import React from "react";

import styles from "@styles/components/UI/text-area.module.scss";

type Props = {
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  elementRef?: React.LegacyRef<HTMLTextAreaElement>;
  value?: string | number | readonly string[];
  placeholder?: string;
};

const TextArea: React.FC<Props> = ({
  onChange,
  elementRef,
  value,
  placeholder,
}) => {
  return (
    <textarea
      className={styles.text_area}
      cols={30}
      rows={10}
      onChange={onChange}
      ref={elementRef}
      value={value}
      placeholder={placeholder}
    ></textarea>
  );
};

export default TextArea;

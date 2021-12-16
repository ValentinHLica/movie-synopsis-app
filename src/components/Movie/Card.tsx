import React from "react";
import { Link } from "react-router-dom";

import styles from "@styles/components/Movie/card.module.scss";

type Props = {
  image: string;
  title: string;
  id: number;
};

const Card: React.FC<Props> = ({ image, title, id }) => {
  return (
    <Link to={`/movie/${id}`}>
      <div className={styles.card}>
        <img src={image} alt={`${title} - Image`} />
        <h3>{title}</h3>
      </div>
    </Link>
  );
};

export default Card;

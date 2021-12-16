import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "@components/Layout";

const MoviePage: React.FC = () => {
  const { id }: { id: string } = useParams();

  const [loading, setLoading] = useState<boolean>(true);

  const fetchMovie = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve(null);
      }, 2000);
    });
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  const nav = [
    {
      text: "Movie",
    },
    {
      text: "Title",
    },
  ];

  return (
    <Layout nav={nav} loading={loading}>
      {id}
    </Layout>
  );
};

export default MoviePage;

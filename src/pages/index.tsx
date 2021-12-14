import { useContext } from "react";

import Context from "@components/Context";

import Layout from "@components/Layout";
import { Input } from "@ui";

import styles from "@styles/pages/home.module.scss";

const HomePage: React.FC = () => {
  const { setSearchQuery } = useContext(Context);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <Layout>
      <div className={styles.search__container}>
        <form onSubmit={onSubmit}>
          <Input
            placeholder="Search Movie..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" />
        </form>

        <div className={styles.filter}></div>
      </div>
    </Layout>
  );
};

export default HomePage;

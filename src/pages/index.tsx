import { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { Filters, SingleMovie } from "@interface/api";

import Context from "@components/Context";
import Layout from "@components/Layout";
import { Input, Dropdown, Spinner } from "@ui";

import filtersData from "@data/filters";

import searchMovies from "@api/search";

import styles from "@styles/pages/home.module.scss";
import Card from "@components/Movie/Card";

const HomePage: React.FC = () => {
  const history = useHistory();
  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    movies,
    setMovies,
  } = useContext(Context);

  const [loading, setLoading] = useState<boolean>(false);
  const [bottom, setBottom] = useState<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const [endPage, setEndPage] = useState<boolean>(false);
  const page = useRef<number>(1);

  const fetchMovies = async (more: boolean) => {
    if (!more) {
      setMovies(null);
    }
    setLoading(true);

    const data = await searchMovies({
      genre: filters.genre,
      limit: 50,
      minimum_rating: filters.rating,
      order_by: "desc",
      page: page.current,
      quality: filters.quality,
      query_term: searchQuery,
      sort_by: filters.sort,
    });

    if (!more) {
      setMovies(data.movies);
    } else {
      setMovies((prevState) => [
        ...(prevState as SingleMovie[]),
        ...data.movies,
      ]);
    }

    if (
      Math.ceil(data.pagination.count / data.pagination.limit) >
      data.pagination.currentPage
    ) {
      page.current = page.current + 1;
    } else {
      setEndPage(true);
    }

    setLoading(false);
  };

  const loadMore = async () => {
    if (endPage) return;

    await fetchMovies(true);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    page.current = 1;

    await fetchMovies(false);
  };

  useEffect(() => {
    fetchMovies(false);
  }, [filters]);

  useEffect(() => {
    const observerInstance = observer.current;

    if (observerInstance) {
      if (bottom) {
        observerInstance.observe(bottom);
      }
      return () => {
        if (bottom) {
          observerInstance.unobserve(bottom);
        }
      };
    }
  }, [bottom]);

  useEffect(() => {
    const observerInstance = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && !loading) {
          await loadMore();
        }
      },
      { threshold: 0.25, rootMargin: "10px" }
    );

    observer.current = observerInstance;
  }, []);

  return (
    <Layout
      nav={[
        {
          text: "Editor",
          onClick: () => {
            history.push("/editor");
          },
        },
      ]}
    >
      <div className={styles.search__container}>
        <form onSubmit={onSubmit}>
          <Input
            placeholder="Search Movie..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" />
        </form>

        <ul className={styles.filter}>
          {filtersData.map((filter, index) => {
            const { title, option, name } = filter;

            return (
              <Dropdown
                text={title}
                items={option.map((e) => ({
                  text: e,
                  onClick: () => {
                    setFilters((prevState: Filters) => ({
                      ...prevState,
                      [name]: e,
                    }));
                  },
                }))}
                key={index}
                type="light"
              />
            );
          })}
        </ul>
      </div>

      {loading && !movies ? (
        <Spinner />
      ) : (
        <div className={styles.movies}>
          {movies?.map((movie, index) => {
            const { title, image, id } = movie;

            return <Card title={title} image={image} id={id} key={index} />;
          })}

          <div ref={setBottom} />
        </div>
      )}

      {loading && movies && <Spinner />}
    </Layout>
  );
};

export default HomePage;

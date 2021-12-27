import React, { useContext, useEffect, useRef, useState } from "react";

import dateFormat from "dateformat";

import { Button, Input, Progress } from "@ui";
import { SaveIcon } from "@icon";
import Context from "@components/Context";

import { createMovie } from "@utils/generation";
import { categories } from "@data/movie";

import styles from "@styles/components/VideoPlayer/Timestamp/create.module.scss";

const Create: React.FC = () => {
  const { videoPath, timestamps, setSettings, setViewTimestamp } =
    useContext(Context);

  const startTime = useRef<Date>(new Date());
  const movieTitle = useRef<HTMLInputElement>(null);
  const [currentTimer, setCurrentTimer] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [totalProgress, setTotalProgress] = useState<number>(0);
  const [categoriesList, setCategoriesList] = useState<
    { name: string; selected: boolean }[]
  >(categories.map((e) => ({ name: e, selected: false })));

  const onChangeCategories = (index: number) => {
    setCategoriesList((prevState) =>
      prevState.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            selected: !item.selected,
          };
        }

        return item;
      })
    );
  };

  const createVideo = async () => {
    const exportPath = localStorage.getItem("output-path");
    const voice = localStorage.getItem("voice");

    if (
      exportPath &&
      exportPath !== "" &&
      voice &&
      voice !== "" &&
      movieTitle.current
    ) {
      setLoading(true);

      try {
        await createMovie({
          videoPath: videoPath as string,
          timeStamps: timestamps,
          exportPath,
          setProgress,
          setTotalProgress,
          voice,
          title: movieTitle.current.value,
          categories: categoriesList
            .filter((e) => e.selected)
            .map((e) => e.name),
        });
      } catch (error) {
        setError(true);
      }

      setLoading(false);
    } else {
      setViewTimestamp(false);
      setSettings(true);
    }
  };

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setCurrentTimer(new Date());
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [loading]);

  return (
    <div className={styles.create}>
      {!loading && progress === 0 ? (
        <form className={styles.form}>
          <div className={styles.form__item}>
            <h5>Title:</h5>
            <Input placeholder="Movie title..." inputRef={movieTitle} />
          </div>

          <div className={styles.form__item}>
            <h5>Category:</h5>

            <ul className={styles.categories}>
              {categoriesList.map((item, index) => {
                const { name, selected } = item;

                return (
                  <li
                    key={index}
                    className={selected ? styles.selected : ""}
                    onClick={onChangeCategories.bind(this, index)}
                  >
                    {name}
                  </li>
                );
              })}
            </ul>
          </div>

          <Button
            onClick={createVideo}
            className={styles.create_btn}
            loading={loading}
            type={error ? "danger" : "warning"}
            icon={<SaveIcon />}
            disabled={timestamps.length === 0}
          >
            Create Video
          </Button>
        </form>
      ) : (
        <div>
          <h5>{`Elapsed Time: ${dateFormat(
            currentTimer.getTime() - startTime.current.getTime(),
            "MM:ss"
          )}`}</h5>

          <Progress
            max={totalProgress}
            value={loading ? progress : totalProgress}
          />
        </div>
      )}
    </div>
  );
};

export default Create;

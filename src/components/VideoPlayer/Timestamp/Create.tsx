import React, { useContext, useState } from "react";

import { Button, Input, Progress } from "@ui";
import { MovieIcon } from "@icon";
import Context from "@context";

import { createMovie } from "@utils/generation";
import { categories } from "@data/movie";

import styles from "@styles/components/VideoPlayer/Timestamp/create.module.scss";
import moment from "moment";

const Create: React.FC = () => {
  const {
    videoPath,
    timestamps,
    setSettings,
    setViewTimestamp,
    customAudio,
    createLoading,
    setCreateLoading,
    progress,
    setProgress,
    totalProgress,
    setTotalProgress,
    currentTimer,
    setCurrentTimer,
  } = useContext(Context);

  const [movieTitle, setMovieTitle] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
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

    if (exportPath && exportPath !== "" && movieTitle) {
      setCreateLoading(true);

      let interval = setInterval(() => {
        setCurrentTimer((prevValue) => prevValue + 1);
      }, 1000);

      try {
        await createMovie({
          videoPath: videoPath as string,
          timeStamps: timestamps,
          exportPath,
          setProgress,
          setTotalProgress,
          voice,
          title: movieTitle,
          categories: categoriesList
            .filter((e) => e.selected)
            .map((e) => e.name),
          customAudio,
        });
      } catch (error) {
        setError(true);
      }

      clearInterval(interval);
      setCreateLoading(false);
      setProgress(0);
    } else {
      setViewTimestamp(false);
      setSettings(true);
    }
  };

  return (
    <div className={styles.create}>
      {!createLoading && progress === 0 ? (
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.form__item}>
            <h5>Title:</h5>
            <Input
              placeholder="Movie title..."
              onChange={(e) => {
                setMovieTitle(e.target.value);
              }}
            />
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
            loading={createLoading}
            icon={<MovieIcon />}
            disabled={
              !(
                timestamps.length > 0 &&
                movieTitle !== "" &&
                categoriesList.filter((e) => e.selected).length > 0
              )
            }
          >
            Create Video
          </Button>
        </form>
      ) : (
        <div>
          <h5>{`Elapsed Time: ${moment
            .utc(currentTimer * 1000)
            .format("HH:mm:ss")}`}</h5>

          <Progress
            max={totalProgress}
            value={createLoading ? progress : totalProgress}
          />
        </div>
      )}

      {error && <h4>Error</h4>}
    </div>
  );
};

export default Create;

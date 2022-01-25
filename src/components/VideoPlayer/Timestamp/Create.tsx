import React, { useContext, useState } from "react";

import { Button, Input, Progress } from "@ui";
import { MovieIcon, AudioVizIcon } from "@icon";
import Context from "@context";

import { createMovie } from "@utils/generation";
import { categories } from "@data/movie";
import { tempPath } from "@config/paths";

import styles from "@styles/components/VideoPlayer/Timestamp/create.module.scss";
import moment from "moment";

const Create: React.FC = () => {
  const { videoPath, timestamps, setSettings, setViewTimestamp, customAudio } =
    useContext(Context);

  const [movieTitle, setMovieTitle] = useState<string>("");
  const [currentTimer, setCurrentTimer] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [totalProgress, setTotalProgress] = useState<number>(0);
  const [categoriesList, setCategoriesList] = useState<
    { name: string; selected: boolean }[]
  >(categories.map((e) => ({ name: e, selected: false })));
  const [createVideoStep, setCreateVideoStep] = useState<boolean>(false);

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
      let customAudioStep: "audio" | "video" | null = null;

      if (customAudio) {
        if (!createVideoStep) {
          customAudioStep = "audio";

          navigator.clipboard.writeText(tempPath);
        } else {
          customAudioStep = "video";
        }
      }

      let interval: NodeJS.Timeout | undefined;

      if (!customAudioStep || customAudioStep === "video") {
        setLoading(true);

        interval = setInterval(() => {
          setCurrentTimer((prevValue) => prevValue + 1);
        }, 1000);
      }

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
          customAudio: customAudioStep,
        });
      } catch (error) {
        setError(true);
      }

      if (customAudio) {
        setCreateVideoStep(true);
      }

      if (interval) {
        clearInterval(interval);
      }

      setLoading(false);
    } else {
      setViewTimestamp(false);
      setSettings(true);
    }
  };

  return (
    <div className={styles.create}>
      {!loading && progress === 0 ? (
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
            loading={loading}
            icon={
              customAudio && !createVideoStep ? <AudioVizIcon /> : <MovieIcon />
            }
            disabled={
              !(
                timestamps.length > 0 &&
                movieTitle !== "" &&
                categoriesList.filter((e) => e.selected).length > 0
              )
            }
          >
            Create {customAudio && !createVideoStep ? "Audio" : "Video"}
          </Button>
        </form>
      ) : (
        <div>
          <h5>{`Elapsed Time: ${moment
            .utc(currentTimer * 1000)
            .format("HH:mm:ss")}`}</h5>

          <Progress
            max={totalProgress}
            value={loading ? progress : totalProgress}
          />
        </div>
      )}

      {error && <h4>Error</h4>}
    </div>
  );
};

export default Create;

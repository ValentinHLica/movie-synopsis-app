import React, { useEffect, useState } from "react";

import { Input } from "@ui";

const ContentText: React.FC = () => {
  const [intro, setIntro] = useState<string>("");
  const [outro, setOutro] = useState<string>("");

  const onChange: (type: "intro" | "outro", value: string) => void = (
    type,
    value
  ) => {
    if (type === "intro") {
      setIntro(value);
    } else {
      setOutro(value);
    }

    localStorage.setItem(type, value);
  };

  useEffect(() => {
    const savedIntro = localStorage.getItem("intro");
    if (savedIntro) {
      setIntro(savedIntro);
    }

    const savedOutro = localStorage.getItem("outro");
    if (savedOutro) {
      setOutro(savedOutro);
    }
  }, []);

  return (
    <>
      <li>
        <h5>Intro</h5>
        <Input
          placeholder="Intro text..."
          value={intro}
          onChange={(e) => {
            onChange("intro", e.target.value);
          }}
        />
      </li>

      <li>
        <h5>Outro</h5>
        <Input
          placeholder="Outro text..."
          value={outro}
          onChange={(e) => {
            onChange("outro", e.target.value);
          }}
        />
      </li>
    </>
  );
};

export default ContentText;

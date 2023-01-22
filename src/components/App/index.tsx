import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchModes, startHandler } from "../../store/reducers/dataSlice";
import { Mode } from "../../store/reducers/types";
import { Button } from "../Button";
import { HoverCount } from "../HoverCount";
import { Select } from "../Select";
import { Square } from "../Square";
import styles from "./app.module.scss";

export const App = () => {
  const [currentMode, setCurrentMode] = useState<Mode | null>(null);
  const { modes, status, fields } = useAppSelector((state) => state.data);

  const dispatch = useAppDispatch();

  const startGame = () => {
    currentMode?.field && dispatch(startHandler(currentMode.field));
  };

  useEffect(() => {
    dispatch(fetchModes());
  }, [dispatch]);

  if (status === "loading")
    return <span className={styles.loading}>Loading ...</span>;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.wrapperPlayTable}>
          {fields.length > 0 && (
            <div className={styles.playTable}>
              {fields.map(({ isActive }, index) => {
                return (
                  <Square
                    key={index + "_field"}
                    index={index}
                    isActive={isActive}
                  />
                );
              })}
            </div>
          )}
        </div>
        <div className={styles.header}>
          <Select options={modes} onChange={setCurrentMode} />
          <Button onClick={startGame} />
        </div>
      </div>

      <HoverCount />
    </div>
  );
};

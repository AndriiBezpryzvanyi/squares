import { useState } from "react";
import { Mode } from "../../store/reducers/types";
import clsx from "clsx";
import { ReactComponent as Arrow } from "../../assets/arrow.svg";
import styles from "./select.module.scss";

interface SelectProps {
  options: Mode[] | null;
  onChange: (mode: Mode) => void;
}

export const Select = ({ options, onChange }: SelectProps) => {
  const [isActive, setIsActive] = useState(false);
  const [currentValue, setCurrentValue] = useState<Mode | null>(null);

  const handleChangeValue = (value: Mode) => {
    onChange(value);
    setCurrentValue(value);
  };

  return (
    <div className={styles.container} onClick={() => setIsActive(!isActive)}>
      <div className={clsx(styles.input, isActive && styles.active)}>
        {currentValue?.name ?? "Pick Mode"}
        <Arrow />
      </div>
      {isActive ? (
        <div className={styles.list}>
          {options?.map((mode, index) => (
            <span
              key={index}
              className={styles.option}
              onClick={() => handleChangeValue(mode)}
            >
              {mode.name}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
};

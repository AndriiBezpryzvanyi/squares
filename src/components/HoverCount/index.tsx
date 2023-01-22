import { useAppSelector } from "../../store/hooks";
import styles from "./hoverCount.module.scss";

export const HoverCount = () => {
  const { fields } = useAppSelector((state) => state.data);
  const ownFields = fields.filter((element) => element.isActive);

  return (
    <div className={styles.container}>
      <span className={styles.title}>Hover Squares</span>
      <div className={styles.list}>
        {ownFields.length > 0 &&
          ownFields.map(({ position }) => {
            const row =
              position % 5 === 0 ? position / 5 : Math.floor(position / 5 + 1);
            const col =
              position <= 5 ? position : position % 5 === 0 ? 5 : position % 5;
            return (
              <div key={position} className={styles.info}>
                <span>Row: {row}</span>
                <span>Col: {col}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

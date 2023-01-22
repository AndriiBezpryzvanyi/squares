import { useAppDispatch } from "../../store/hooks";
import { hoverHandler } from "../../store/reducers/dataSlice";
import styles from "./squares.module.scss";

interface SquareProps {
  index: number;
  isActive: boolean;
}

export const Square = ({ index, isActive }: SquareProps) => {
  const dispatch = useAppDispatch();
  const handlerHover = () => {
    dispatch(hoverHandler(index));
  };

  const currentStyles = [styles.wrapper, isActive ? styles.active : ""]
    .filter(Boolean)
    .join(" ");

  return <div className={currentStyles} onMouseEnter={handlerHover} />;
};

import styles from "./button.module.scss";

interface ButtonProps {
  onClick: () => void;
}

export const Button = ({ onClick }: ButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
      Start
    </button>
  );
};

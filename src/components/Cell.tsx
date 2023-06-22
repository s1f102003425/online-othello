import styles from './cell.module.css';
export const Cell = (props: { x: number; y: number; color: number; onClick: () => void }) => {
  return (
    <div className={styles.cell} onClick={props.onClick}>
      {props.color === 3 && <div className={styles.candidate} style={{ background: '#ffcd00' }} />}
      {props.color !== 0 && (
        <div className={styles.stone} style={{ background: props.color === 1 ? '#000' : '#fff' }} />
      )}
    </div>
  );
};

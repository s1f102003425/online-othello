import styles from './cell.module.css';
export const Cell = (props: { x: number; y: number; color: number; onClick: () => void }) => {
  return (
    <div className={styles.cell} onClick={props.onClick}>
      {props.color === -1 && (
        <div className={styles.candidate} style={{ borderBlockColor: 'red' }} />
      )}
      {props.color !== 0 && props.color !== -1 && (
        <div className={styles.stone} style={{ background: props.color === 1 ? '#000' : '#fff' }} />
      )}
    </div>
  );
};

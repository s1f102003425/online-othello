import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../atoms/user';
import { Cell } from '../components/Cell';
import styles from './index.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [board, setBoard] = useState<number[][]>();
  const fetchBoard = async () => {
    const res = await apiClient.board.$get().catch(returnNull);
    if (res !== null) {
      setBoard(res);
    }
  };
  const onClick = async (x: number, y: number) => {
    await apiClient.board.$post({ body: { x, y } });
    await fetchBoard();
  };
  useEffect(() => {
    const cancelId = setInterval(fetchBoard, 500);
    return () => {
      clearInterval(cancelId);
    };
  }, []);
  const turnColor = 1;
  if (!board || !user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.container}>
        <div className={styles.board}>
          {board.map((row, y) =>
            row.map((color, x) => (
              <Cell key={`${x}-${y}`} x={x} y={y} color={color} onClick={() => onClick(x, y)} />
            ))
          )}
        </div>
        <p>{turnColor === 1 ? '黒' : '白'}の手盤です</p>
      </div>
    </>
  );
};

export default Home;

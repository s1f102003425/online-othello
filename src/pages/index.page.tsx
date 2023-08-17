// import type { UserId } from '$/commonTypesWithClient/branded';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
// import { colorDict, colorUseCase } from '../../server/useCase/colorUseCase';
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
  // 手番表示するためのの関数を設定
  const [turn, setTurn] = useState(1);
  const calculateTurnFromBoard = (copyBoard: number[][]) => {
    let stoneCount = 0;
    for (const row of copyBoard) {
      for (const element of row) {
        if (element !== 0) {
          stoneCount++;
        }
      }
    }
    return stoneCount % 2 === 0 ? 1 : 2;
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
  // 手番を表示する
  useEffect(() => {
    if (board) {
      const currentTurn = calculateTurnFromBoard(board);
      setTurn(currentTurn);
    }
  }, [board]);
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
        {/* <h1>{turn === 1 ? '黒' : '白'}の手盤です</h1> */}
      </div>
    </>
  );
};

export default Home;

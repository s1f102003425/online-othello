import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
//import type { UserId } from '../../server/commonTypesWithClient/branded';
//import { colorDict, colorUseCase } from '../../server/useCase/colorUseCase';
import { turnColor } from '../../server/useCase/boardUseCase';
import { userAtom } from '../atoms/user';
import { Cell } from '../components/Cell';
import styles from './index.module.css';
//import {boardUseCase} from "../../server/useCase/boardUseCase"

const Home = () => {
  const [user] = useAtom(userAtom);
  const [board, setBoard] = useState<number[][]>();
  const fetchBoard = async () => {
    const res = await apiClient.board.$get().catch(returnNull);
    if (res !== null) {
      setBoard(res);
    }
  };
  //const [turnColor, setTurnColor] = useState(1);
  /*const changeColor = () => {
    setTurnColor(2 / turnColor);
  };*/
  const onClick = async (x: number, y: number) => {
    await apiClient.board.$post({ body: { x, y } });
    //await changeColor();
    await fetchBoard();
  };
  useEffect(() => {
    const cancelId = setInterval(fetchBoard, 500);
    return () => {
      clearInterval(cancelId);
    };
  }, []);
  if (!board || !user) return <Loading visible />;
  //const userId: UserId = colorDict.black;

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
        <h1>{turnColor === 1 ? '黒' : '白'}の手盤です</h1>
      </div>
    </>
  );
};

export default Home;
/*<h1>{colorUseCase.createColor(userId: UserId) === 1 ? '黒' : '白'}の手盤です</h1> */

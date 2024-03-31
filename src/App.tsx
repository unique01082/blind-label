import Box from '@/components/Box';
import { Game } from '@/core/Game';
import { useDepsReactive } from '@/hooks/useDepsReactive';
import { useMemoizedFn, useReactive, useUpdate } from 'ahooks';
import { Space, Typography } from 'antd';
import { useState } from 'react';
import './App.css';

function App() {
  const [game, setGame] = useState<Game | null>(null);
  const gameState = useDepsReactive(() => game, [game]);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>(
    'easy',
  );

  const [numberOfWrongs, setNumberOfWrongs] = useState<number>(
    game?.getNumberOfWrongPosition() || -1,
  );

  const [itemToSwap, setItemToSwap] = useState<number | null>(null);

  const { checked } = useReactive<{ checked: boolean[] }>({ checked: [] });

  const update = useUpdate();

  const startGame = useMemoizedFn(() => {
    let items: string[] = [];
    switch (difficulty) {
      case 'easy':
        items = [
          'bl-aichong09',
          'bl-aichong10',
          'bl-aichong11',
          'bl-aichong12',
        ];
        break;
      case 'medium':
        items = [
          'bl-aichong09',
          'bl-aichong10',
          'bl-aichong11',
          'bl-aichong12',
          'bl-aichong13',
          'bl-aichong14',
        ];
        break;
      case 'hard':
        items = [
          'bl-aichong09',
          'bl-aichong10',
          'bl-aichong11',
          'bl-aichong12',
          'bl-aichong13',
          'bl-aichong14',
          'bl-aichong15',
          'bl-aichong16',
        ];
        break;

      default:
        items = [
          'bl-aichong10',
          'bl-aichong10',
          'bl-aichong10',
          'bl-aichong10',
        ];
        break;
    }
    setGame(new Game({ items }));
  });

  const handleSwap = useMemoizedFn((itemIndex: number) => {
    if (itemToSwap === null) {
      setItemToSwap(itemIndex);
    } else {
      game!.swapGuess(itemToSwap, itemIndex);
      setItemToSwap(null);
    }
  });

  const handleCheck = useMemoizedFn(() => {
    setItemToSwap(null);
    const result = game!.getNumberOfWrongPosition();
    setNumberOfWrongs(result);
    if (result === 0) {
      alert('Win!!!');
    } else {
      alert(`Sai ${result} chỗ rồi bạn ơi =))`);
    }
    update();
  });

  if (!game || !gameState) {
    return (
      <div className="flex flex-grow align-middle justify-center">
        <button onClick={() => setDifficulty('easy')}>Easy</button>
        <button onClick={() => setDifficulty('medium')}>Medium</button>
        <button onClick={() => setDifficulty('hard')}>Hard</button>
        <hr />
        <button onClick={startGame}>Gét gô</button>
      </div>
    );
  }

  return (
    <div className="flex flex-grow align-middle justify-center">
      <Space>
        {gameState.items.map((item, index) => (
          <Box
            label={item}
            hidden={numberOfWrongs !== 0}
            type="dashed"
            size="large"
            onClick={() => {
              checked[index] = !checked[index];
            }}
            ghost={checked[index]}
          />
        ))}
      </Space>
      <hr />
      <Space>
        {gameState.guess.map((item, index) => (
          <Box
            label={item}
            onClick={() => handleSwap(index)}
            ghost={index === itemToSwap ? true : false}
            type="dashed"
            size="large"
          />
        ))}
      </Space>

      {itemToSwap !== null && (
        <Typography.Paragraph>Select another item to swap</Typography.Paragraph>
      )}
      <hr />
      <button onClick={handleCheck}>[{game.turns.toString()}] Check</button>
      <hr />
      {numberOfWrongs === 0 ? (
        <button onClick={() => setGame(null)}>Next game</button>
      ) : (
        <button onClick={() => setGame(null)}>Surrender</button>
      )}
    </div>
  );
}

export default App;

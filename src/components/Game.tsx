import React, { useEffect, useRef, useState } from 'react';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface GameState {
  player: GameObject;
  obstacles: GameObject[];
  score: number;
  gameOver: boolean;
  level: number;
}

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>({
    player: { x: 50, y: 150, width: 30, height: 30 },
    obstacles: [],
    score: 0,
    gameOver: false,
    level: 1,
  });

  const [isJumping, setIsJumping] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!gameStarted) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let animationFrameId: number;
    let obstacleTimer: NodeJS.Timeout;

    const GRAVITY = 0.5;
    const JUMP_FORCE = -10;
    let velocityY = 0;

    const updateGame = () => {
      setGameState(prevState => {
        if (prevState.gameOver) return prevState;

        // Update player
        let newY = prevState.player.y;
        if (isJumping) {
          velocityY = JUMP_FORCE;
          setIsJumping(false);
        }
        velocityY += GRAVITY;
        newY += velocityY;

        // Ground collision
        if (newY > canvas.height - prevState.player.height) {
          newY = canvas.height - prevState.player.height;
          velocityY = 0;
        }

        // Update obstacles
        const newObstacles = prevState.obstacles
          .map(obs => ({ ...obs, x: obs.x - 5 }))
          .filter(obs => obs.x + obs.width > 0);

        // Collision detection
        const collision = newObstacles.some(obs =>
          obs.x < prevState.player.x + prevState.player.width &&
          obs.x + obs.width > prevState.player.x &&
          obs.y < newY + prevState.player.height &&
          obs.y + obs.height > newY
        );

        if (collision) {
          return { ...prevState, gameOver: true };
        }

        // Update score
        const newScore = prevState.score + 1;
        const newLevel = Math.floor(newScore / 1000) + 1;

        return {
          ...prevState,
          player: { ...prevState.player, y: newY },
          obstacles: newObstacles,
          score: newScore,
          level: newLevel,
        };
      });
    };

    const renderGame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw player
      ctx.fillStyle = '#3B82F6';
      ctx.fillRect(
        gameState.player.x,
        gameState.player.y,
        gameState.player.width,
        gameState.player.height
      );

      // Draw obstacles
      ctx.fillStyle = '#EF4444';
      gameState.obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      });

      // Draw score and level
      ctx.fillStyle = '#000000';
      ctx.font = '20px Arial';
      ctx.fillText(`Score: ${gameState.score}`, 10, 30);
      ctx.fillText(`Level: ${gameState.level}`, canvas.width - 100, 30);
    };

    const gameLoop = () => {
      updateGame();
      renderGame();
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    // Start game loop
    gameLoop();

    // Spawn obstacles
    obstacleTimer = setInterval(() => {
      setGameState(prevState => ({
        ...prevState,
        obstacles: [
          ...prevState.obstacles,
          {
            x: canvas.width,
            y: canvas.height - 50,
            width: 20,
            height: 50,
          },
        ],
      }));
    }, 2000 - (gameState.level * 200));

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(obstacleTimer);
    };
  }, [gameStarted, isJumping, gameState.level]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      setIsJumping(true);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const startGame = () => {
    setGameState({
      player: { x: 50, y: 150, width: 30, height: 30 },
      obstacles: [],
      score: 0,
      gameOver: false,
      level: 1,
    });
    setGameStarted(true);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-4xl font-bold text-white mb-4">Hydration Runner</h1>
      
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="bg-white rounded-lg shadow-lg"
        />
        
        {(!gameStarted || gameState.gameOver) && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              {gameState.gameOver && (
                <div className="mb-4 text-white">
                  <h2 className="text-2xl font-bold mb-2">Game Over!</h2>
                  <p>Score: {gameState.score}</p>
                  <p>Level: {gameState.level}</p>
                </div>
              )}
              <button
                onClick={startGame}
                className="bg-blue-500 text-white px-8 py-3 rounded-full font-bold
                         hover:bg-blue-600 transition-colors duration-200"
              >
                {gameState.gameOver ? 'Play Again' : 'Start Game'}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="text-white text-center">
        <p className="text-lg mb-2">Press SPACE to jump</p>
        <p>Avoid obstacles and collect points to level up!</p>
      </div>
    </div>
  );
}
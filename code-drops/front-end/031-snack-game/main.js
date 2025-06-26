    // --- JavaScript 游戏逻辑 ---

    // 1. 获取HTML元素
    const gameCanvas = document.getElementById('game-canvas');
    const ctx = gameCanvas.getContext('2d');
    const scoreDisplay = document.getElementById('score');
    
    // 界面浮层
    const startScreen = document.getElementById('start-screen');
    const gameOverOverlay = document.getElementById('game-over-overlay');
    
    // 按钮
    const easyBtn = document.getElementById('easy-btn');
    const mediumBtn = document.getElementById('medium-btn');
    const hardBtn = document.getElementById('hard-btn');
    const restartButton = document.getElementById('restart-button');
    
    const finalScoreDisplay = document.getElementById('final-score');

    // 2. 游戏核心常量和变量
    const gridSize = 20; // 每个格子的大小（像素）
    const tileCount = 20; // 游戏区域的格子数量 (20x20)
    
    gameCanvas.width = gridSize * tileCount;
    gameCanvas.height = gridSize * tileCount;

    // 游戏状态变量
    let snake, dx, dy, food, score, gameOver, changingDirection, gameSpeed;

    // 3. 游戏流程控制
    
    /**
     * @description 开始游戏
     * @param {number} speed - 游戏速度 (setTimeout的延迟毫秒数)
     */
    function startGame(speed) {
        gameSpeed = speed;
        
        // 隐藏开始菜单
        startScreen.style.display = 'none';
        
        // 初始化游戏状态并开始主循环
        initializeGame();
        mainLoop();
    }
    
    /**
     * @description 初始化或重置游戏状态
     */
    function initializeGame() {
        snake = [ { x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 } ];
        dx = 1;
        dy = 0;
        score = 0;
        scoreDisplay.textContent = score;
        gameOver = false;
        changingDirection = false;
        gameOverOverlay.style.display = 'none';
        generateFood();
    }
    
    /**
     * @description 游戏主循环
     */
    function mainLoop() {
        if (gameOver) {
            showGameOverScreen();
            return;
        }
        
        setTimeout(() => {
            changingDirection = false;
            clearCanvas();
            drawFood();
            moveSnake();
            drawSnake();
            mainLoop();
        }, gameSpeed); // 使用基于难度的游戏速度
    }

    /**
     * @description 显示游戏结束界面
     */
    function showGameOverScreen() {
        finalScoreDisplay.textContent = `你的最终得分: ${score}`;
        gameOverOverlay.style.display = 'flex';
    }

    /**
     * @description 显示开始菜单（用于重新开始）
     */
    function showStartScreen() {
        clearCanvas(); // 清理画布
        startScreen.style.display = 'flex';
        gameOverOverlay.style.display = 'none';
    }

    // 4. 绘制相关函数
    function clearCanvas() {
        ctx.fillStyle = '#fdfdfd';
        ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    }

    function drawSnakePart(part) {
        ctx.fillStyle = '#4CAF50';
        ctx.strokeStyle = '#333';
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
        ctx.strokeRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
    }

    function drawSnake() {
        snake.forEach(drawSnakePart);
    }

    function drawFood() {
        ctx.fillStyle = '#E91E63';
        ctx.strokeStyle = '#c2185b';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
        ctx.strokeRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    }
    
    // 5. 核心逻辑函数
    function moveSnake() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score += 10;
            scoreDisplay.textContent = score;
            generateFood();
        } else {
            snake.pop();
        }

        checkGameOver();
    }

    function generateFood() {
        while (true) {
            food = {
                x: Math.floor(Math.random() * tileCount),
                y: Math.floor(Math.random() * tileCount)
            };
            let foodOnSnake = snake.some(part => part.x === food.x && part.y === food.y);
            if (!foodOnSnake) break;
        }
    }
    
    function checkGameOver() {
        const head = snake[0];
        const hitWall = head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount;
        let hitSelf = false;
        for (let i = 4; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                hitSelf = true;
                break;
            }
        }
        if (hitWall || hitSelf) {
            gameOver = true;
        }
    }
    
    // 6. 事件监听器
    // 难度选择
    easyBtn.addEventListener('click', () => startGame(150));   // 简单：150毫秒/步
    mediumBtn.addEventListener('click', () => startGame(100)); // 中等：100毫秒/步
    hardBtn.addEventListener('click', () => startGame(60));    // 困难：60毫秒/步

    // 重新开始
    restartButton.addEventListener('click', showStartScreen);

    // 键盘控制
    document.addEventListener('keydown', (event) => {
        if (gameOver) {
            // 游戏结束后按空格键也可以回到主菜单
            if (event.key === ' ') {
                showStartScreen();
            }
            return;
        }
        
        if (changingDirection) return;
        changingDirection = true;

        const keyPressed = event.key;
        const goingUp = dy === -1;
        const goingDown = dy === 1;
        const goingRight = dx === 1;
        const goingLeft = dx === -1;

        if ((keyPressed === 'ArrowLeft' || keyPressed.toLowerCase() === 'a') && !goingRight) {
            dx = -1; dy = 0;
        } else if ((keyPressed === 'ArrowUp' || keyPressed.toLowerCase() === 'w') && !goingDown) {
            dx = 0; dy = -1;
        } else if ((keyPressed === 'ArrowRight' || keyPressed.toLowerCase() === 'd') && !goingLeft) {
            dx = 1; dy = 0;
        } else if ((keyPressed === 'ArrowDown' || keyPressed.toLowerCase() === 's') && !goingUp) {
            dx = 0; dy = 1;
        }
    });

    // --- 页面加载后 ---
    // 清理画布并显示开始菜单
    clearCanvas();
    
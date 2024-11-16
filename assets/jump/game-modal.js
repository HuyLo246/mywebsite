class GameModal {
    constructor() {
      this.createStyles();
      this.createGameButton();
      this.createModal();
    }
  
    createStyles() {
      const styleSheet = document.createElement('style');
      styleSheet.textContent = `
        .game-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          padding: 15px 30px;
          background: linear-gradient(45deg, #ff6b6b, #ff8e53);
          border: none;
          border-radius: 25px;
          color: white;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          z-index: 9999;
        }
  
        .game-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
        }
  
        .game-modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.8);
          z-index: 10000;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
  
        .game-modal.active {
          display: block;
          opacity: 1;
        }
  
        .game-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #1F1F20;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
          width: 1000px;
          height: 640px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
  
        .close-button {
          position: absolute;
          top: -15px;
          right: -15px;
          width: 30px;
          height: 30px;
          background-color: #ff6b6b;
          border: none;
          border-radius: 50%;
          color: white;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.3s ease;
        }
  
        .close-button:hover {
          background-color: #ff5252;
        }
  
        .game-frame {
          border: none;
          width: 960px;
          height: 600px;
          background: #1F1F20;
          display: block;
          margin: 0 auto;
        }
  
        @media (max-width: 1000px) {
          .game-frame {
            width: 90vw;
            height: 56.25vw;
          }
        }
      `;
      document.head.appendChild(styleSheet);
    }
  
    createGameButton() {
      const gameButton = document.createElement('button');
      gameButton.className = 'game-button';
      gameButton.innerHTML = '🎮 Play Jump!';
      gameButton.addEventListener('click', () => this.openModal());
      document.body.appendChild(gameButton);
    }
  
    createModal() {
      const modal = document.createElement('div');
      modal.className = 'game-modal';
      
      const gameContainer = document.createElement('div');
      gameContainer.className = 'game-container';
      
      const closeButton = document.createElement('button');
      closeButton.className = 'close-button';
      closeButton.innerHTML = '×';
      closeButton.addEventListener('click', () => this.closeModal());
      
      const gameFrame = document.createElement('iframe');
      gameFrame.className = 'game-frame';
      gameFrame.src = 'assets/jump/jump.gzip/index.html';
      
      gameContainer.appendChild(closeButton);
      gameContainer.appendChild(gameFrame);
      modal.appendChild(gameContainer);
      
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModal();
      });
      
      document.body.appendChild(modal);
    }
  
    openModal() {
      const modal = document.querySelector('.game-modal');
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  
    closeModal() {
      const modal = document.querySelector('.game-modal');
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }
class GameModal {
  constructor() {
    this.init();
  }

  init() {
    // Create trigger container
    const triggerContainer = document.createElement('div');
    triggerContainer.className = 'game-popup-trigger';
    
    // Create game button
    const gameButton = document.createElement('button');
    gameButton.className = 'game-button';
    gameButton.id = 'gamePopupBtn';
    
    // Create game icon
    const gameIcon = document.createElement('img');
    gameIcon.src = '/assets/img/controller-icon.png';
    gameIcon.className = 'game-icon';
    gameIcon.alt = 'Play Game';
    
    // Create tooltip
    const tooltip = document.createElement('span');
    tooltip.className = 'game-tooltip';
    tooltip.textContent = 'Play Jump Game!';
    
    // Assemble button
    gameButton.appendChild(gameIcon);
    gameButton.appendChild(tooltip);
    triggerContainer.appendChild(gameButton);
    
    // Create popup
    const popup = document.createElement('div');
    popup.className = 'game-popup';
    popup.id = 'gamePopup';
    
    // Create game container
    const gameContainer = `
      <div class="game-container">
        <div class="game-header">
          <h2>Jump Game</h2>
          <button class="close-game" id="closeGame">&times;</button>
        </div>
        <div class="game-frame-container">
          <iframe id="gameFrame" 
                  src="/assets/jump/game/index.html" 
                  frameborder="0"
                  scrolling="no"
                  allowfullscreen="true">
          </iframe>
        </div>
      </div>
    `;
    
    popup.innerHTML = gameContainer;
    
    // Add to document
    document.body.appendChild(triggerContainer);
    document.body.appendChild(popup);
    
    // Event listeners
    gameButton.addEventListener('click', () => this.openModal());
    document.getElementById('closeGame').addEventListener('click', () => this.closeModal());
    popup.addEventListener('click', (e) => {
      if (e.target === popup) this.closeModal();
    });
  }

  openModal() {
    const popup = document.getElementById('gamePopup');
    popup.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    const popup = document.getElementById('gamePopup');
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}
class GameModal {
  constructor() {
    this.init();
  }

  init() {
    // Create game button
    const gameButton = document.createElement('button');
    gameButton.className = 'game-button';
    gameButton.innerHTML = '🎮 Play Jump!';
    document.body.appendChild(gameButton);

    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'game-modal';
    document.body.appendChild(modal);

    // Create game container
    const gameContainer = document.createElement('div');
    gameContainer.className = 'game-container';
    modal.appendChild(gameContainer);

    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '×';
    gameContainer.appendChild(closeButton);

    // Load game iframe
    const gameFrame = document.createElement('iframe');
    gameFrame.src = '/assets/jump/jump.gzip/index.html';
    gameFrame.width = '960';
    gameFrame.height = '600';
    gameFrame.style.border = 'none';
    gameContainer.appendChild(gameFrame);

    // Event listeners
    gameButton.addEventListener('click', () => this.openModal());
    closeButton.addEventListener('click', () => this.closeModal());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.closeModal();
    });
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
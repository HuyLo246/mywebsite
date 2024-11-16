class GameModal {
  constructor() {
    this.init();
  }

  init() {
    // Get existing elements instead of creating new ones
    const gameButton = document.getElementById('gamePopupBtn');
    const popup = document.getElementById('gamePopup');
    const closeButton = document.getElementById('closeGame');

    if (!gameButton || !popup || !closeButton) {
      console.error('Required game modal elements not found');
      return;
    }

    // Event listeners
    gameButton.addEventListener('click', () => this.openModal());
    closeButton.addEventListener('click', () => this.closeModal());
    popup.addEventListener('click', (e) => {
      if (e.target === popup) this.closeModal();
    });
  }

  openModal() {
    const popup = document.getElementById('gamePopup');
    if (popup) {
      popup.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    const popup = document.getElementById('gamePopup');
    if (popup) {
      popup.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  }
}
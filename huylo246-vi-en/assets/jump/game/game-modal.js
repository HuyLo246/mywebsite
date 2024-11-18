class GameModal {
    constructor() {
        this.openBtn = document.getElementById('gamePopupBtn');
        this.gameUrl = window.location.origin + '/huylo246-vi-en/assets/jump/game/file.gzip/index.html';
        this.init();
        console.log('GameModal initialized with URL:', this.gameUrl);
    }

    init() {
        if (!this.openBtn) {
            console.error('Game button not found!');
            return;
        }
        this.openBtn.addEventListener('click', () => {
            console.log('Opening game...');
            this.openGame();
        });
    }

    openGame() {
        console.log('Attempting to open game at:', this.gameUrl);
        try {
            const gameWindow = window.open(this.gameUrl, '_blank');
            if (gameWindow) {
                gameWindow.onerror = (error) => {
                    console.error('Game window error:', error);
                };
            } else {
                console.error('Could not open game window - popup might be blocked');
            }
        } catch (error) {
            console.error('Error opening game:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const gameModal = new GameModal();
});
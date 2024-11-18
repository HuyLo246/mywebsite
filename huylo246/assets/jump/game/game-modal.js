class GameModal {
    constructor() {
        this.openBtn = document.getElementById('gamePopupBtn');
        this.gameUrl = 'assets/jump/game/file.gzip/index.html';
        this.init();
        console.log('GameModal initialized');
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
            window.open(this.gameUrl, '_blank');
        } catch (error) {
            console.error('Error opening game:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const gameModal = new GameModal();
});
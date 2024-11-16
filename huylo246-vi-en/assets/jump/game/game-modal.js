class GameModal {
    constructor() {
        this.modal = document.getElementById('gamePopup');
        this.openBtn = document.getElementById('gamePopupBtn');
        this.closeBtn = document.getElementById('closeGame');
        this.gameFrame = document.getElementById('gameFrame');
        this.gameLoaded = false;
        this.gameUrl = '/assets/jump/game/index.html';
        
        this.isPlaying = false;
        this.score = 0;
        this.gameState = 'idle';  // idle, playing, paused, ended
        
        this.init();
    }

    init() {
        this.openBtn.addEventListener('click', () => this.openModal());
        this.closeBtn.addEventListener('click', () => this.closeModal());
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        this.gameFrame.addEventListener('load', () => {
            this.onGameLoad();
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'flex') {
                this.closeModal();
            }
        });
    }

    openModal() {
        this.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        if (!this.gameLoaded) {
            this.loadGame();
        }
        
        this.trackGameOpen();
    }

    loadGame() {
        this.gameFrame.src = this.gameUrl;
    }

    onGameLoad() {
        this.gameLoaded = true;
        
        try {
            const gameWindow = this.gameFrame.contentWindow;
            if (gameWindow.startGame) {
                gameWindow.startGame();
                this.isPlaying = true;
                this.gameState = 'playing';
                
                gameWindow.addEventListener('gameScore', (e) => this.updateScore(e.detail));
                gameWindow.addEventListener('gameEnd', () => this.handleGameEnd());
            }
        } catch (error) {
            console.warn('Could not auto-start game:', error);
        }
    }

    updateScore(newScore) {
        this.score = newScore;
        // Trigger any score-based events or UI updates
    }

    handleGameEnd() {
        this.gameState = 'ended';
        this.isPlaying = false;
        // Handle end game logic, high scores, etc.
    }

    trackGameOpen() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'game_opened', {
                'event_category': 'Game',
                'event_label': 'Game Modal Opened'
            });
        }
    }

    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.gameFrame.src = this.gameFrame.src;
        this.gameLoaded = false;
    }
}

// Initialize the modal
document.addEventListener('DOMContentLoaded', () => {
    const gameModal = new GameModal();
});
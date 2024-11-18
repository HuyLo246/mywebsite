class GameModal {
    constructor() {
        this.modal = document.getElementById('gamePopup');
        this.openBtn = document.getElementById('gamePopupBtn');
        this.closeBtn = document.getElementById('closeGame');
        this.gameFrame = document.getElementById('gameFrame');
        this.gameLoaded = false;
        this.gameUrl = 'assets/jump/game/file.gzip/index.html';
        
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
    }

    openModal() {
        this.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        if (!this.gameLoaded) {
            this.loadGame();
        }
    }

    loadGame() {
        try {
            this.gameFrame.src = this.gameUrl;
            this.gameFrame.onerror = (error) => {
                console.error('Game loading error:', error);
            };
            this.gameFrame.onload = () => {
                console.log('Game frame loaded');
                this.gameLoaded = true;
            };
        } catch (error) {
            console.error('Error loading game:', error);
        }
    }

    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // Reset the game when closing
        this.gameFrame.src = '';
        this.gameLoaded = false;
    }
}

// Initialize the modal
document.addEventListener('DOMContentLoaded', () => {
    const gameModal = new GameModal();
});
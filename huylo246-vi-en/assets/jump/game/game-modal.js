class GameModal {
    constructor() {
        this.openBtn = document.getElementById('gamePopupBtn');
        this.gameUrl = 'assets/jump/game/file.gzip/index.html';
        this.init();
    }

    init() {
        this.openBtn.addEventListener('click', () => this.openGame());
    }

    openGame() {
        window.open(this.gameUrl, '_blank');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const gameModal = new GameModal();
});
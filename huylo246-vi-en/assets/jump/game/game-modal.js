class GameModal {
    constructor() {
        this.modal = document.getElementById('gamePopup');
        this.openBtn = document.getElementById('gamePopupBtn');
        this.closeBtn = document.getElementById('closeGame');
        this.gameLoaded = false;
        this.gameInstance = null;
        this.init();
    }

    init() {
        if (!this.openBtn) {
            console.error('Game button not found!');
            return;
        }
        this.openBtn.addEventListener('click', () => this.openModal());
        this.closeBtn.addEventListener('click', () => this.closeModal());
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Add message listener for Unity
        window.addEventListener('message', (event) => {
            if (event.data === 'returnToHome') {
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
            createUnityInstance(document.querySelector("#unity-canvas"), {
                dataUrl: "assets/jump/game/file.gzip/Build/file.gzip.data.unityweb",
                frameworkUrl: "assets/jump/game/file.gzip/Build/file.gzip.framework.js.unityweb",
                codeUrl: "assets/jump/game/file.gzip/Build/file.gzip.wasm.unityweb",
                streamingAssetsUrl: "assets/jump/game/file.gzip/StreamingAssets",
                companyName: "HuyLo246",
                productName: "Jump",
                productVersion: "1.0.0",
                matchWebGLToCanvasSize: true,
                devicePixelRatio: 1
            }).then((unityInstance) => {
                console.log('Game loaded successfully');
                this.gameInstance = unityInstance;
                this.gameLoaded = true;
            }).catch((error) => {
                console.error('Error loading game:', error);
            });
        } catch (error) {
            console.error('Error initializing game:', error);
        }
    }

    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const gameModal = new GameModal();
});
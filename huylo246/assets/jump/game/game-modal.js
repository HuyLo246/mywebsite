class GameModal {
    constructor() {
        this.modal = document.getElementById('gamePopup');
        this.openBtn = document.getElementById('gamePopupBtn');
        this.closeBtn = document.getElementById('closeGame');
        this.soundBtn = document.getElementById('soundToggle');
        this.gameLoaded = false;
        this.gameInstance = null;
        this.isMuted = false;
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.init();
    }

    init() {
        if (!this.openBtn) {
            console.error('Game button not found!');
            return;
        }
        this.openBtn.addEventListener('click', () => this.openModal());
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.soundBtn.addEventListener('click', () => this.toggleSound());
        
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
    }

    toggleSound() {
        this.isMuted = !this.isMuted;
        if (this.gameInstance) {
            this.gameInstance.SendMessage('AudioManager', 'SetMute', this.isMuted);
        }
        
        const icon = this.soundBtn.querySelector('i');
        icon.className = this.isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
    }

    closeModal() {
        if (this.gameInstance) {
            this.gameInstance.Quit().then(() => {
                this.gameInstance = null;
                this.gameLoaded = false;
                this.modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        } else {
            this.modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    loadGame() {
        try {
            this.loadingOverlay.style.display = 'flex';
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
                this.loadingOverlay.style.display = 'none';
                if (this.isMuted) {
                    this.gameInstance.SendMessage('AudioManager', 'SetMute', true);
                }
            }).catch((error) => {
                console.error('Error loading game:', error);
                this.loadingOverlay.innerHTML = '<div class="loading-text">Error loading game</div>';
            });
        } catch (error) {
            console.error('Error initializing game:', error);
            this.loadingOverlay.innerHTML = '<div class="loading-text">Error loading game</div>';
        }
    }

    openModal() {
        this.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        if (!this.gameLoaded) {
            this.loadGame();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const gameModal = new GameModal();
});
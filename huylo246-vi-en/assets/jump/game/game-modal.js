class GameModal {
    constructor() {
        this.modal = document.getElementById('gamePopup');
        this.openBtn = document.getElementById('gamePopupBtn');
        this.closeBtn = document.getElementById('closeGame');
        this.soundBtn = document.getElementById('soundToggle');
        this.gameLoaded = false;
        this.gameInstance = null;
        this.isMuted = localStorage.getItem('websiteMuted') === 'true';
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.init();
        if (this.soundBtn) {
            const icon = this.soundBtn.querySelector('i');
            if (icon) {
                icon.className = this.isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
            }
        }
    }

    init() {
        if (!this.openBtn) {
            console.error('Game button not found!');
            return;
        }
        this.openBtn.addEventListener('click', () => this.openModal());
        this.closeBtn.addEventListener('click', () => this.closeModal(true));
        this.soundBtn.addEventListener('click', () => this.toggleSound());
        window.addEventListener('click', this.handleOutsideClick);
    }

    handleOutsideClick(e) {
        if (e.target === this.modal) {
            this.closeModal(false);
        }
    }

    toggleSound() {
        this.isMuted = !this.isMuted;
        
        // Get all audio contexts in the page
        const audioContexts = [];
        for (const iframe of document.getElementsByTagName('iframe')) {
            try {
                const ctx = iframe.contentWindow.AudioContext || 
                           iframe.contentWindow.webkitAudioContext;
                if (ctx) audioContexts.push(ctx);
            } catch (e) {}
        }
        
        // Suspend/resume audio contexts
        audioContexts.forEach(ctx => {
            try {
                if (this.isMuted) {
                    ctx.suspend();
                } else {
                    ctx.resume();
                }
            } catch (e) {}
        });
        
        // Update icon
        const icon = this.soundBtn.querySelector('i');
        icon.className = this.isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
        
        // Store mute preference
        localStorage.setItem('websiteMuted', this.isMuted.toString());
    }

    closeModal(fullClose = false) {
        if (fullClose && this.gameInstance) {
            try {
                // Destroy the Unity instance
                this.gameInstance.Quit().then(() => {
                    this.gameInstance = null;
                    this.gameLoaded = false;
                    this.modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    
                    // Clear the canvas
                    const canvas = document.querySelector("#unity-canvas");
                    const ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }).catch(error => {
                    console.warn('Error closing Unity instance:', error);
                    this.handleCleanup();
                });
            } catch (error) {
                console.warn('Error closing game:', error);
                this.handleCleanup();
            }
        } else {
            // Just hide the modal without destroying the game instance
            this.modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    handleCleanup() {
        this.gameInstance = null;
        this.gameLoaded = false;
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    openModal() {
        this.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        if (!this.gameLoaded) {
            this.loadGame();
        } else {
            // If game is already loaded, just show it
            if (this.loadingOverlay) {
                this.loadingOverlay.style.display = 'none';
            }
        }
    }

    loadGame() {
        try {
            if (this.loadingOverlay) {
                this.loadingOverlay.style.display = 'flex';
            }
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
                if (this.loadingOverlay) {
                    this.loadingOverlay.style.display = 'none';
                }
                // Apply initial mute state if needed
                if (this.isMuted) {
                    this.toggleSound();
                }
            }).catch((error) => {
                console.error('Error loading game:', error);
                if (this.loadingOverlay) {
                    this.loadingOverlay.innerHTML = '<div class="loading-text">Error loading game</div>';
                }
            });
        } catch (error) {
            console.error('Error initializing game:', error);
            if (this.loadingOverlay) {
                this.loadingOverlay.innerHTML = '<div class="loading-text">Error loading game</div>';
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const gameModal = new GameModal();
});
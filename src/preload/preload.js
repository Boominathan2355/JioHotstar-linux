const { contextBridge, ipcRenderer } = require('electron');

// Brige to expose safer APIs to the renderer
contextBridge.exposeInMainWorld('electronAPI', {
    // Add any specific IPC calls here if needed for custom UI
});

// Inject custom CSS for premium look and feel
window.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.innerHTML = `
        /* Custom Premium Scrollbar */
        ::-webkit-scrollbar {
            width: 10px;
            height: 10px;
        }
        ::-webkit-scrollbar-track {
            background: #0f1014;
        }
        ::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #1f2128, #2a2d36);
            border-radius: 10px;
            border: 2px solid #0f1014;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #3a3f4b;
        }

        /* Adjust Header for Frameless look (if we ever use it) */
        /* For now, just making sure the web content feels centered and clean */
        #header-container {
            background: rgba(15, 16, 20, 0.9) !important;
            backdrop-filter: blur(10px);
        }

        /* Hide specific web elements that clutter the desktop view */
        .download-app-link, .web-footer-links {
            display: none !important;
        }

        /* Premium font smoothing */
        body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
    `;
    document.head.appendChild(style);
});


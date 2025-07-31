// Unified Document Viewer System
class DocumentViewer {
    constructor() {
        this.viewers = new Map();
        this.currentViewer = null;
        this.currentZoom = 100;
        this.currentPage = 1;
        this.totalPages = 0;
        this.searchTerm = '';
        this.searchResults = [];
        this.currentSearchIndex = 0;
        this.init();
    }

    init() {
        this.setupGlobalStyles();
        this.setupEventListeners();
        this.initializeViewers();
    }

    // Create Document Viewer Container
    createDocumentViewer(projectId, docUrl, docTitle) {
        const container = document.createElement('div');
        container.id = `docViewer-${projectId}`;
        container.className = 'document-viewer-container';
        
        // Create PDF viewer directly without toolbar
        const viewer = this.createDocumentViewerContent(projectId, docUrl);
        container.appendChild(viewer);
        
        return container;
    }

    // Create Document Viewer Content
    createDocumentViewerContent(projectId, docUrl) {
        const viewer = document.createElement('div');
        viewer.className = 'document-viewer-content';
        
        // Use direct PDF loading since it works well
        viewer.innerHTML = `
            <div class="document-loading" id="documentLoading-${projectId}">
                <div class="loading-spinner"></div>
                <p>Loading document...</p>
            </div>
            <iframe id="documentIframe-${projectId}" class="document-iframe" src="${docUrl}" style="display: none;" onload="documentViewer.onDocumentLoaded('${projectId}')" onerror="documentViewer.onDocumentError('${projectId}')"></iframe>
            <div class="document-error" id="documentError-${projectId}" style="display: none;">
                <div class="error-content">
                    <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                    <h3>Document cannot be loaded</h3>
                    <p>There was an error loading the document. Please try again or use the download option.</p>
                    <div class="error-actions">
                        <button class="btn-retry" onclick="documentViewer.retryLoad('${projectId}')">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                            </svg>
                            Retry
                        </button>
                        <button class="btn-download" onclick="documentViewer.downloadDocument('${docUrl}')">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            Download
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        return viewer;
    }

    // Initialize Viewers
    initializeViewers() {
        // Initialize for all projects
        const projectIds = ['project1', 'project2'];
        projectIds.forEach(projectId => {
            const docsData = this.getDocsData(projectId);
            if (docsData) {
                const viewer = this.createDocumentViewer(projectId, docsData.url, docsData.title);
                this.viewers.set(projectId, {
                    id: projectId,
                    container: viewer,
                    isOpen: false,
                    data: docsData
                });
            }
        });
    }

    getDocsData(projectId) {
        if (window.siteContent && window.siteContent.projectDetails && window.siteContent.projectDetails[projectId]) {
            const project = window.siteContent.projectDetails[projectId];
            return {
                title: project.docsTitle || 'Project Documentation',
                url: project.docsUrl,
                description: project.docsDescription || 'Project documentation and technical details',
                type: project.docsType || 'pdf'
            };
        }

        // Fallback data
        const fallbackData = {
            project1: {
                title: 'Industrial Catering System Documentation',
                url: 'docs/IndustrialCatering.pdf',
                description: 'Complete technical documentation and user guide',
                type: 'pdf'
            },
            project2: {
                title: 'Ice Cream Shop Documentation',
                url: 'docs/Ice_cream.pdf',
                description: 'System architecture and deployment guide',
                type: 'pdf'
            }
        };

        return fallbackData[projectId];
    }

    // Document Loading Methods
    onDocumentLoaded(projectId) {
        const loading = document.getElementById(`documentLoading-${projectId}`);
        const iframe = document.getElementById(`documentIframe-${projectId}`);
        
        if (loading) loading.style.display = 'none';
        if (iframe) iframe.style.display = 'block';
        
        this.playSoundEffect('docs-open');
    }

    onDocumentError(projectId) {
        const loading = document.getElementById(`documentLoading-${projectId}`);
        const error = document.getElementById(`documentError-${projectId}`);
        const iframe = document.getElementById(`documentIframe-${projectId}`);
        
        if (loading) loading.style.display = 'none';
        if (error) error.style.display = 'flex';
        if (iframe) iframe.style.display = 'none';
    }

    // Error Handling
    retryLoad(projectId) {
        const iframe = document.getElementById(`documentIframe-${projectId}`);
        const loading = document.getElementById(`documentLoading-${projectId}`);
        const error = document.getElementById(`documentError-${projectId}`);
        
        if (iframe) {
            loading.style.display = 'flex';
            error.style.display = 'none';
            iframe.style.display = 'none';
            iframe.src = iframe.src;
        }
    }

    // Download and Open Methods
    downloadDocument(docUrl) {
        try {
            const link = document.createElement('a');
            link.href = docUrl;
            link.download = docUrl.split('/').pop() || 'document.pdf';
            link.target = '_blank';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            this.playSoundEffect('download-success');
        } catch (error) {
            console.error('Download failed:', error);
            this.showNotification('Download failed. Please try again.', 'error');
        }
    }

    openInNewTab(projectId) {
        const viewer = this.viewers.get(projectId);
        if (!viewer || !viewer.data) return;

        try {
            window.open(viewer.data.url, '_blank');
            this.playSoundEffect('docs-open');
        } catch (error) {
            console.error('Failed to open document:', error);
            this.showNotification('Failed to open document. Please try again.', 'error');
        }
    }

    // Sound Effects
    playSoundEffect(type) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            let frequency, duration;
            switch (type) {
                case 'docs-open':
                    frequency = 800;
                    duration = 0.1;
                    break;
                case 'docs-close':
                    frequency = 600;
                    duration = 0.1;
                    break;
                case 'download-success':
                    frequency = 1000;
                    duration = 0.2;
                    break;
                default:
                    frequency = 500;
                    duration = 0.1;
            }

            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.5, audioContext.currentTime + duration);

            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        } catch (error) {
            console.log('Sound effect not supported');
        }
    }

    // Notification System
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `docs-notification docs-notification-${type}`;
        notification.innerHTML = `
            <div class="docs-notification-content">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="docs-notification-close">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 3000);
    }

    // Event Listeners
    setupEventListeners() {
        // Listen for messages from iframe
        window.addEventListener('message', (event) => {
            if (event.data && event.data.type) {
                this.handleIframeMessage(event.data);
            }
        });
    }

    handleIframeMessage(data) {
        switch (data.type) {
            case 'documentLoaded':
                this.onDocumentLoaded(data.projectId);
                break;
            case 'documentError':
                this.onDocumentError(data.projectId);
                break;
            case 'pageChanged':
                this.updatePageInfo(data.projectId, data.currentPage, data.totalPages);
                break;
            case 'searchResults':
                this.updateSearchResults(data.projectId, data.results, data.currentIndex);
                break;
        }
    }

    updatePageInfo(projectId, currentPage, totalPages) {
        const currentPageEl = document.getElementById(`currentPage-${projectId}`);
        const totalPagesEl = document.getElementById(`totalPages-${projectId}`);
        
        if (currentPageEl) currentPageEl.textContent = currentPage;
        if (totalPagesEl) totalPagesEl.textContent = totalPages;
    }

    updateSearchResults(projectId, results, currentIndex) {
        const searchCount = document.getElementById(`searchCount-${projectId}`);
        if (searchCount) {
            searchCount.textContent = `${currentIndex + 1}/${results.length}`;
        }
    }

    // Global Styles
    setupGlobalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .document-viewer-container {
                display: flex;
                flex-direction: column;
                height: 700px;
                min-height: 600px;
                max-height: 85vh;
                background: #f8fafc;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }

            .document-viewer-content {
                flex: 1;
                position: relative;
                background: white;
                min-height: 600px;
                height: 100%;
            }

            .document-loading {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                color: #64748b;
            }

            .loading-spinner {
                width: 40px;
                height: 40px;
                border: 4px solid #e2e8f0;
                border-top: 4px solid #3b82f6;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 16px;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            .document-iframe {
                width: 100%;
                height: 100%;
                min-height: 600px;
                border: none;
                background: white;
            }

            .document-error {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .error-content {
                text-align: center;
                padding: 48px;
                max-width: 500px;
            }

            .error-content svg {
                margin: 0 auto 24px;
                background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                padding: 24px;
                border-radius: 50%;
                box-shadow: 0 8px 25px rgba(239, 68, 68, 0.3);
            }

            .error-content h3 {
                margin: 0 0 12px 0;
                color: #1e293b;
                font-size: 24px;
                font-weight: 700;
            }

            .error-content p {
                color: #64748b;
                margin-bottom: 32px;
                font-size: 16px;
                line-height: 1.6;
            }

            .error-actions {
                display: flex;
                gap: 16px;
                justify-content: center;
                flex-wrap: wrap;
            }

            .btn-retry, .btn-download {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 12px 20px;
                border-radius: 8px;
                font-weight: 600;
                font-size: 14px;
                transition: all 0.3s;
                border: none;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }

            .btn-retry {
                background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
                color: white;
            }

            .btn-retry:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
            }

            .btn-download {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
            }

            .btn-download:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
            }

            /* Modal specific styles */
            #projectModal .document-viewer-container {
                height: 600px;
                min-height: 500px;
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                .document-viewer-container {
                    height: 500px;
                    min-height: 400px;
                }
            }

            @media (max-width: 480px) {
                .document-viewer-container {
                    height: 400px;
                    min-height: 300px;
                }
            }

            /* Notification styles */
            .docs-notification {
                position: fixed;
                top: 24px;
                right: 24px;
                z-index: 10000;
                max-width: 350px;
                animation: docs-slide-in 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .docs-notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 16px 20px;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
                font-size: 14px;
                font-weight: 500;
                backdrop-filter: blur(10px);
            }

            .docs-notification-success {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
            }

            .docs-notification-error {
                background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                color: white;
            }

            .docs-notification-info {
                background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
                color: white;
            }

            .docs-notification-close {
                margin-left: 16px;
                opacity: 0.8;
                transition: all 0.2s;
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: inherit;
                cursor: pointer;
                padding: 4px;
                border-radius: 6px;
            }

            .docs-notification-close:hover {
                opacity: 1;
                background: rgba(255, 255, 255, 0.3);
            }

            @keyframes docs-slide-in {
                from {
                    transform: translateX(100%) scale(0.9);
                    opacity: 0;
                }
                to {
                    transform: translateX(0) scale(1);
                    opacity: 1;
                }
            }

            .hidden {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Global functions for HTML onclick handlers
function createDocumentViewer(projectId, docUrl, docTitle) {
    if (!window.documentViewer) {
        window.documentViewer = new DocumentViewer();
    }
    return window.documentViewer.createDocumentViewer(projectId, docUrl, docTitle);
}

function downloadDocument(docUrl) {
    if (!window.documentViewer) {
        window.documentViewer = new DocumentViewer();
    }
    window.documentViewer.downloadDocument(docUrl);
}

function openDocumentInNewTab(projectId) {
    if (!window.documentViewer) {
        window.documentViewer = new DocumentViewer();
    }
    window.documentViewer.openInNewTab(projectId);
}

// Initialize document viewer when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.documentViewer = new DocumentViewer();
}); 
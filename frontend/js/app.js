// ===== Main Application Controller =====
// Global state
const state = {
    currentMode: null,
    wizardConfig: {},
    generatedScript: ''
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeModeSelection();
    initializeOutputControls();
});

// ===== Mode Selection =====
function initializeModeSelection() {
    const offlineModeBtn = document.getElementById('offline-mode-btn');
    const aiModeBtn = document.getElementById('ai-mode-btn');
    const backToModesBtn = document.getElementById('back-to-modes');
    const backToModesAiBtn = document.getElementById('back-to-modes-ai');

    offlineModeBtn.addEventListener('click', () => switchMode('offline'));
    aiModeBtn.addEventListener('click', () => switchMode('ai'));
    backToModesBtn.addEventListener('click', () => switchMode(null));
    backToModesAiBtn.addEventListener('click', () => switchMode(null));

    document.getElementById('new-script').addEventListener('click', () => {
        switchMode(null);
        document.getElementById('output-panel').classList.add('hidden');
    });
}

function switchMode(mode) {
    const modeSelection = document.getElementById('mode-selection');
    const offlineWizard = document.getElementById('offline-wizard');
    const aiMode = document.getElementById('ai-mode');

    state.currentMode = mode;

    // Hide all
    modeSelection.classList.add('hidden');
    offlineWizard.classList.add('hidden');
    aiMode.classList.add('hidden');

    // Show selected mode
    if (mode === 'offline') {
        offlineWizard.classList.remove('hidden');
        if (window.initWizard) window.initWizard();
    } else if (mode === 'ai') {
        aiMode.classList.remove('hidden');
    } else {
        modeSelection.classList.remove('hidden');
    }
}

// ===== Output Controls =====
function initializeOutputControls() {
    const copyBtn = document.getElementById('copy-script');
    const downloadBtn = document.getElementById('download-script');

    copyBtn.addEventListener('click', copyScriptToClipboard);
    downloadBtn.addEventListener('click', downloadScript);
}

async function copyScriptToClipboard() {
    const copyBtn = document.getElementById('copy-script');
    const scriptContent = document.getElementById('script-content').textContent;
    const originalText = copyBtn.innerText;

    try {
        await navigator.clipboard.writeText(scriptContent);
        copyBtn.innerText = 'DONE [!]';
        setTimeout(() => {
            copyBtn.innerText = originalText;
        }, 2000);
    } catch (err) {
        console.error('Kopyalama hatası:', err);
        alert('Kopyalama başarısız. Lütfen manuel olarak kopyalayın.');
    }
}

function downloadScript() {
    const scriptContent = document.getElementById('script-content').textContent;
    const blob = new Blob([scriptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    const timestamp = new Date().toISOString().split('T')[0];
    a.href = url;
    a.download = `arch-install-${timestamp}.sh`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ===== Script Display =====
function displayScript(scriptContent) {
    state.generatedScript = scriptContent;

    const outputPanel = document.getElementById('output-panel');
    const scriptElement = document.getElementById('script-content');

    scriptElement.textContent = scriptContent;
    outputPanel.classList.remove('hidden');

    // Scroll to output
    outputPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Export functions for use in other modules
window.displayScript = displayScript;
window.switchMode = switchMode;

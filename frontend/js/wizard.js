// ===== Terminal UI (TUI) Offline Controller =====

let tuiConfig = {
    disk: 'en-buyuk',
    fs: 'ext4',
    kernel: 'linux',
    de: 'none',
    de_sub: 'none',
    gpu: 'mesa'
};

function initWizard() {
    tuiConfig = {
        disk: 'en-buyuk',
        fs: 'ext4',
        kernel: 'linux',
        de: 'none',
        de_sub: 'none',
        gpu: 'mesa'
    };

    setupEventListeners();
    updateUIState();
}

function setupEventListeners() {
    // TUI Option Clicks
    const options = document.querySelectorAll('.tui-option');
    options.forEach(option => {
        option.addEventListener('click', (e) => {
            const section = option.closest('.tui-section')?.dataset.section ||
                option.closest('.tui-sub-branches')?.dataset.parent;

            if (!section) return;

            const value = option.dataset.value;
            const branch = option.dataset.branch;

            if (branch) {
                // Handle switching DE branches
                tuiConfig.de = branch;
                tuiConfig.de_sub = 'none'; // Reset sub-selection
                handleBranchSwitch(branch);
            } else if (option.closest('.tui-sub-branches')) {
                // Secondary selection
                tuiConfig.de_sub = value;
            } else {
                // Main section selection
                tuiConfig[section] = value;
            }

            updateUIState();
        });
    });

    // Generate Script
    document.getElementById('generate-script').addEventListener('click', () => {
        const finalConfig = prepareConfigForTemplate(tuiConfig);
        const script = window.buildScriptFromConfig(finalConfig);
        window.displayScript(script);
    });

    // Back to modes handled by app.js usually, but let's ensure it works
    const backBtn = document.getElementById('back-to-modes');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            document.getElementById('offline-wizard').classList.add('hidden');
            document.getElementById('mode-selection').classList.remove('hidden');
        });
    }
}

function handleBranchSwitch(branch) {
    // Hide all sub-branches first
    document.querySelectorAll('.tui-sub-branches').forEach(sub => sub.classList.add('hidden'));

    // Show specific sub-branch if it exists
    const subContainer = document.getElementById(`de-sub-${branch}`);
    if (subContainer) {
        subContainer.classList.remove('hidden');
    }
}

function updateUIState() {
    // Clear all selected classes
    document.querySelectorAll('.tui-option').forEach(opt => opt.classList.remove('selected'));

    // Highlight active main options
    Object.keys(tuiConfig).forEach(key => {
        const val = tuiConfig[key];
        if (val === 'none' && key !== 'de') return;

        // Try to find the option with this value
        const option = document.querySelector(`.tui-option[data-value="${val}"]`);
        if (option) option.classList.add('selected');

        // Also highlight branch if it's the active DE
        if (key === 'de' && val !== 'none') {
            const branchOpt = document.querySelector(`.tui-option[data-branch="${val}"]`);
            if (branchOpt) branchOpt.classList.add('selected');
        }
    });
}

function prepareConfigForTemplate(config) {
    // Map TUI config to what template-engine expects
    // The engine expects keys like 'disk_device', 'filesystem', 'kernel', 'desktop_environment'
    return {
        disk_device: config.disk,
        filesystem: config.fs,
        kernel: config.kernel,
        desktop_environment: config.de === 'none' ? 'none' : (config.de_sub !== 'none' ? config.de_sub : config.de),
        gpu_driver: config.gpu,
        package_groups: ['base-devel'] // Default packages
    };
}

// Export for global access
window.initWizard = initWizard;

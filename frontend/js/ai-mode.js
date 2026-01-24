// ===== AI Mode Controller =====

let selectedProvider = 'gemini';

document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-ai-script');
    const aiInput = document.getElementById('ai-input');
    const providerOptions = document.querySelectorAll('#ai-provider-list .tui-option');

    // Provider selection
    providerOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            providerOptions.forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            selectedProvider = opt.dataset.provider;
        });
    });

    // Generate button
    generateBtn.addEventListener('click', generateAIScript);

    // Enter key to generate
    aiInput.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            generateAIScript();
        }
    });
});

async function generateAIScript() {
    const aiInput = document.getElementById('ai-input');
    const generateBtn = document.getElementById('generate-ai-script');
    const statusDiv = document.getElementById('ai-status');
    const statusContent = document.getElementById('ai-status-content');
    const outputPanel = document.getElementById('output-panel');
    const scriptElement = document.getElementById('script-content');

    const userRequest = aiInput.value.trim();
    if (!userRequest) {
        showStatus('Lütfen bir kurulum isteği girin', 'error');
        return;
    }

    // --- UI Setup for Streaming ---
    generateBtn.innerText = 'GENERATING... [CANCEL]';
    statusDiv.classList.remove('hidden');
    showStatus(`AI (${selectedProvider.toUpperCase()}) script oluşturuyor...`, 'info');

    // Clear previous output and show panel
    scriptElement.textContent = ''; // Start with an empty script
    outputPanel.classList.remove('hidden');
    outputPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // --- EventSource Implementation ---
    const evtSource = new EventSource(`/api/ai/generate?userRequest=${encodeURIComponent(userRequest)}&provider=${selectedProvider}`);
    let fullScript = '';

    const cleanup = () => {
        evtSource.close();
        generateBtn.innerText = 'AI_GENERATE.sh [EXEC]';
        generateBtn.onclick = generateAIScript; // Restore original function
    };

    // --- Event Listeners ---
    evtSource.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.event === 'done') {
            showStatus(`✓ Script başarıyla oluşturuldu! (Model: ${data.metadata.model})`, 'success');
            // Final cleanup of the script content, removing markdown
            if (fullScript.trim().endsWith("```")) {
                fullScript = fullScript.trim().slice(0, -3).trim();
            }
            if (!fullScript.trim().startsWith('#!/bin/bash')) {
                fullScript = '#!/bin/bash\n\n' + fullScript;
            }
            scriptElement.textContent = fullScript;
            cleanup();
            return;
        }

        if (data.event === 'error') {
            let errorMessage = `Script oluşturulurken bir hata oluştu: ${data.message}`;
            if (data.message.includes('API key')) {
                errorMessage = '⚠️ Sunucu tarafında API anahtarı geçersiz veya bulunamadı.';
            }
            showStatus(errorMessage, 'error');
            cleanup();
            return;
        }

        if (data.chunk) {
            fullScript += data.chunk;
            scriptElement.textContent = fullScript + '█'; // Add blinking cursor effect
        }
    };

    evtSource.onerror = (err) => {
        console.error("EventSource failed:", err);
        showStatus('Bağlantı hatası oluştu. Lütfen tekrar deneyin.', 'error');
        cleanup();
    };

    // --- Cancel Button Logic ---
    generateBtn.onclick = () => {
        console.log("Stream cancelled by user.");
        showStatus('İşlem kullanıcı tarafından iptal edildi.', 'warning');
        cleanup();
    };
}

function showStatus(message, type) {
    const statusDiv = document.getElementById('ai-status');
    const statusContent = document.getElementById('ai-status-content');
    if (statusContent) statusContent.innerText = `[${type.toUpperCase()}] ${message}`;
    statusDiv.classList.remove('hidden');
}

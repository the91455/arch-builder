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
    const apiKeyInput = document.getElementById('ai-api-key');
    const generateBtn = document.getElementById('generate-ai-script');
    const statusDiv = document.getElementById('ai-status');
    const statusContent = document.getElementById('ai-status-content');

    const userRequest = aiInput.value.trim();
    const apiKey = apiKeyInput.value.trim();

    if (!userRequest) {
        showStatus('Lütfen bir kurulum isteği girin', 'error');
        return;
    }

    // Show loading state
    generateBtn.innerText = 'GENERATE_AI_SCRIPT.sh [LOADING...]';
    generateBtn.disabled = true;
    statusDiv.classList.add('hidden');

    try {
        showStatus(`AI (${selectedProvider.toUpperCase()}) script oluşturuyor... Bu 10-30 saniye sürebilir.`, 'info');

        const response = await fetch('/api/ai/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userRequest,
                provider: selectedProvider,
                apiKey: apiKey || null
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'API isteği başarısız');
        }

        const data = await response.json();

        if (data.success && data.script) {
            showStatus('✓ Script başarıyla oluşturuldu!', 'success');
            window.displayScript(data.script);
        } else {
            throw new Error('Script oluşturulamadı');
        }

    } catch (error) {
        console.error('AI generation error:', error);
        let errorMessage = 'Script oluşturulurken bir hata oluştu: ' + error.message;

        if (error.message.includes('API key')) {
            errorMessage = '⚠️ API anahtarı geçersiz veya bulunamadı.';
        }

        showStatus(errorMessage, 'error');
    } finally {
        // Reset button state
        generateBtn.innerText = 'AI_GENERATE.sh [EXEC]';
        generateBtn.disabled = false;
    }
}

function showStatus(message, type) {
    const statusDiv = document.getElementById('ai-status');
    const statusContent = document.getElementById('ai-status-content');
    if (statusContent) statusContent.innerText = `[${type.toUpperCase()}] ${message}`;
    statusDiv.classList.remove('hidden');
}

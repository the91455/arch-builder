const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const OpenAI = require('openai');
const Anthropic = require('@anthropic-ai/sdk');

// System prompt for Arch Linux script generation
const SYSTEM_PROMPT = `You are an expert Arch Linux system administrator and script writer. Your task is to generate complete, safe, and well-documented Bash installation scripts based on user requirements.

CRITICAL RULES:
1. Always start with #!/bin/bash and set -e (exit on error)
2. Follow Arch Wiki best practices strictly
3. Include comprehensive error checking
4. Add colored output messages (using echo with color codes)
5. Comment each major section
6. Use modern commands (avoid deprecated ones)
7. Include disk safety checks before partitioning
8. Make scripts idempotent where possible

OUTPUT FORMAT:
- Only output the bash script code, nothing else
- No markdown formatting, no explanations outside comments
- Script must be immediately executable

When user requests a setup, analyze their needs and generate a complete installation script covering:
- Disk partitioning (with safety warnings)
- Filesystem creation and mounting
- Base system installation
- Bootloader setup
- Desktop environment or window manager
- GPU drivers if specified
- Additional packages
- User creation and basic configuration`;

router.post('/generate', async (req, res) => {
    try {
        const { userRequest, provider, apiKey } = req.body;

        if (!userRequest || userRequest.trim() === '') {
            return res.status(400).json({ error: 'User request is required' });
        }

        const selectedProvider = provider || 'gemini';
        console.log(`📝 Generating script using ${selectedProvider.toUpperCase()} for request:`, userRequest);

        let scriptContent = '';
        let modelUsed = '';
        const prompt = `${SYSTEM_PROMPT}\n\nUSER REQUEST:\n${userRequest}\n\nGenerate the Arch Linux installation script:`;

        if (selectedProvider === 'gemini') {
            const rawKey = apiKey || process.env.GEMINI_API_KEY;
            if (!rawKey) throw new Error('Gemini API key is missing');

            const key = rawKey.trim();
            const genAI = new GoogleGenerativeAI(key);

            // Try multiple models as fallbacks (including latest 2.5 and 2.0 versions)
            const modelsToTry = [
                'gemini-2.5-flash',
                'gemini-2.5-pro',
                'gemini-2.0-flash',
                'gemini-2.0-flash-exp',
                'gemini-1.5-flash',
                'gemini-1.5-pro',
                'gemini-pro'
            ];
            let lastError = null;

            for (const modelName of modelsToTry) {
                try {
                    console.log(`🔄 Trying Gemini model: ${modelName}`);
                    const model = genAI.getGenerativeModel({ model: modelName });
                    const result = await model.generateContent(prompt);
                    const response = await result.response;
                    scriptContent = response.text();
                    modelUsed = modelName;
                    console.log(`✅ Success with ${modelName}`);
                    break;
                } catch (err) {
                    lastError = err;
                    console.log(`❌ Model ${modelName} failed: ${err.message}`);
                }
            }

            if (!scriptContent) {
                throw new Error(`Gemini All-Models-Failed: ${lastError.message}`);
            }

        } else if (selectedProvider === 'openai') {
            const rawKey = apiKey || process.env.OPENAI_API_KEY;
            if (!rawKey) throw new Error('OpenAI API key is missing');

            const key = rawKey.trim();
            const openai = new OpenAI({ apiKey: key });
            const response = await openai.chat.completions.create({
                model: 'gpt-4o',
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: userRequest }
                ]
            });
            scriptContent = response.choices[0].message.content;
            modelUsed = 'gpt-4o';

        } else if (selectedProvider === 'anthropic') {
            const rawKey = apiKey || process.env.ANTHROPIC_API_KEY;
            if (!rawKey) throw new Error('Anthropic API key is missing');

            const key = rawKey.trim();
            const anthropic = new Anthropic({ apiKey: key });
            const response = await anthropic.messages.create({
                model: 'claude-3-5-sonnet-20240620',
                max_tokens: 4096,
                system: SYSTEM_PROMPT,
                messages: [{ role: 'user', content: userRequest }]
            });
            scriptContent = response.content[0].text;
            modelUsed = 'claude-3-5-sonnet-20240620';
        } else {
            return res.status(400).json({ error: 'Invalid provider selected' });
        }

        // Clean up potential markdown formatting
        scriptContent = scriptContent.replace(/```bash\n?/g, '').replace(/```\n?/g, '');

        // Validate basic script structure
        if (!scriptContent.includes('#!/bin/bash')) {
            scriptContent = '#!/bin/bash\n' + scriptContent;
        }

        console.log('✅ Script generated successfully');

        res.json({
            success: true,
            script: scriptContent,
            metadata: {
                model: modelUsed,
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('❌ Error generating script:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate script',
            message: error.message
        });
    }
});

module.exports = router;

const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function diagnostic() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
        console.error('❌ KEY MISSING IN .env');
        return;
    }

    console.log(`🔑 Key found (length: ${key.length})`);
    const genAI = new GoogleGenerativeAI(key.trim());

    try {
        // In some versions of the SDK, you might need to use a different approach to list models
        // Let's try to see if we can find any model at all.
        console.log('--- Testing Common Models ---');
        const testList = [
            'gemini-1.5-flash',
            'gemini-1.5-flash-8b',
            'gemini-1.5-pro',
            'gemini-1.0-pro',
            'gemini-2.0-flash-exp',
            'gemini-pro'
        ];

        for (const m of testList) {
            try {
                const model = genAI.getGenerativeModel({ model: m });
                // Just a simple count tokens or something non-billable if possible, 
                // but generateContent is easiest to check reachability.
                const result = await model.generateContent({
                    contents: [{ role: 'user', parts: [{ text: 'hi' }] }],
                    generationConfig: { maxOutputTokens: 5 }
                });
                console.log(`✅ ${m}: REACHABLE`);
            } catch (e) {
                console.log(`❌ ${m}: ${e.message}`);
            }
        }

    } catch (err) {
        console.error('💥 Diagnostic Crash:', err);
    }
}

diagnostic();

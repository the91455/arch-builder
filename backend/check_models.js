const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function listModels() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
        console.error('GEMINI_API_KEY is missing in .env');
        return;
    }

    try {
        const genAI = new GoogleGenerativeAI(key);
        // In @google/generative-ai, we use the listModels method on the client
        // However, it's not directly on genAI but on a separate client usually.
        // Let's try to find it or just test a bunch of model names.

        const modelsToTest = [
            'gemini-1.5-flash',
            'gemini-1.5-pro',
            'gemini-1.0-pro',
            'gemini-pro'
        ];

        for (const modelName of modelsToTest) {
            try {
                console.log(`Testing ${modelName}...`);
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent('Hi');
                console.log(`✅ Success with ${modelName}:`, result.response.text());
                return; // Stop if one works
            } catch (err) {
                console.log(`❌ Failed ${modelName}:`, err.message);
            }
        }
    } catch (error) {
        console.error('Diagnostic failed:', error.message);
    }
}

listModels();

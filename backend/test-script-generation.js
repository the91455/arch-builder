// Test script to generate a sample Arch Linux installation script
// This simulates the wizard output

const testConfig = {
    partition_scheme: 'auto-gpt',
    disk_device: '/dev/sda',
    filesystem: 'btrfs',
    swap_size: '8',
    kernel: 'linux-zen',
    desktop_environment: 'gnome',
    window_manager: 'none',
    gpu_driver: 'nvidia',
    package_groups: ['base-devel', 'gaming', 'development']
};

// Load template engine (simulating browser environment)
const fs = require('fs');
const path = require('path');

// Read the template engine code
const templateEngineCode = fs.readFileSync(
    path.join(__dirname, '../frontend/js/template-engine.js'),
    'utf-8'
);

// Execute template engine in Node context
eval(templateEngineCode);

// Generate script
const generatedScript = buildScriptFromConfig(testConfig);

// Write to file
const outputPath = path.join(__dirname, '../test-output.sh');
fs.writeFileSync(outputPath, generatedScript);

console.log('✅ Test script generated successfully!');
console.log(`📄 Output: ${outputPath}`);
console.log(`📊 Script length: ${generatedScript.length} characters`);
console.log('\n--- First 50 lines ---');
console.log(generatedScript.split('\n').slice(0, 50).join('\n'));

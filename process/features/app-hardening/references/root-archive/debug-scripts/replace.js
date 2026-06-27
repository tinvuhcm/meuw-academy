const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('.vercel')) {
                results = results.concat(walk(file));
            }
        } else { 
            if (!file.endsWith('.png') && !file.endsWith('.jpg') && !file.endsWith('.jpeg')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('.');

let changedCount = 0;
files.forEach(file => {
    try {
        const originalContent = fs.readFileSync(file, 'utf8');
        let newContent = originalContent
            .replace(/Méo/g, 'Méo')
            .replace(/méo/g, 'méo')
            .replace(/Méo/g, 'Méo')
            .replace(/méo/g, 'méo');
            
        // Also fix the localstorage key if it was meoAcademy
        newContent = newContent.replace(/meoAcademy/g, 'meoAcademy');
        // And fix the CSS variables
        newContent = newContent.replace(/--meo-/g, '--meo-');
        // Fix renamed asset paths
        newContent = newContent.replace(/méo-/g, 'meo-');

        if (originalContent !== newContent) {
            fs.writeFileSync(file, newContent, 'utf8');
            console.log('Updated:', file);
            changedCount++;
        }
    } catch (e) {
        // Ignore binary read errors etc
    }
});
console.log('Total files changed:', changedCount);

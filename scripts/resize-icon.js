const path = require('path');
const fs = require('fs');

async function resize() {
    try {
        const { Jimp } = await import('jimp');
        const iconPath = path.join(__dirname, '../assets/icon.png');
        const iconsDir = path.join(__dirname, '../build/icons');

        if (!fs.existsSync(iconsDir)) {
            fs.mkdirSync(iconsDir, { recursive: true });
        }

        const sizes = [16, 32, 48, 64, 128, 256, 512];
        const sourceImage = await Jimp.read(iconPath);

        for (const size of sizes) {
            const resized = sourceImage.clone().resize({ w: size, h: size });
            await resized.write(path.join(iconsDir, `${size}x${size}.png`));
            console.log(`Generated ${size}x${size}.png`);
        }

        // Also save a main one in build/icon.png
        await sourceImage.clone().resize({ w: 512, h: 512 }).write(path.join(__dirname, '../build/icon.png'));

    } catch (err) {
        console.error('Error resizing icon:', err);
        process.exit(1);
    }
}

resize();



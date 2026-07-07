const fs = require('fs');
const path = require('path');
const convert = require('heic-convert');

const FOTOS_DIR = path.join(__dirname, '..', 'public', 'fotos');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

async function convertHeicToJpg() {
  if (!fs.existsSync(FOTOS_DIR)) {
    console.error(`Directory not found: ${FOTOS_DIR}`);
    return;
  }

  const allFiles = getAllFiles(FOTOS_DIR);
  const heicFiles = allFiles.filter(filePath => {
    const ext = path.extname(filePath).toLowerCase();
    return ext === '.heic' || ext === '.heif';
  });

  if (heicFiles.length === 0) {
    console.log("No HEIC/HEIF files found to convert.");
    return;
  }

  console.log(`Found ${heicFiles.length} HEIC/HEIF file(s). Starting conversion...`);

  for (const filePath of heicFiles) {
    try {
      const inputBuffer = fs.readFileSync(filePath);
      console.log(`Converting: ${path.basename(filePath)}...`);
      
      const outputBuffer = await convert({
        buffer: inputBuffer,
        format: 'JPEG',
        quality: 0.9
      });

      const dir = path.dirname(filePath);
      const ext = path.extname(filePath);
      const baseName = path.basename(filePath, ext);
      const outputPath = path.join(dir, `${baseName}.jpg`);

      fs.writeFileSync(outputPath, outputBuffer);
      console.log(`Successfully converted to: ${outputPath}`);
      
      // Delete original HEIC file to avoid double-processing
      fs.unlinkSync(filePath);
      console.log(`Removed original file: ${filePath}`);
    } catch (error) {
      console.error(`Failed to convert ${filePath}:`, error);
    }
  }

  console.log("HEIC conversion process finished.");
}

convertHeicToJpg();

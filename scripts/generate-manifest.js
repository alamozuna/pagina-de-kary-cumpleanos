const fs = require('fs');
const path = require('path');

const FOTOS_DIR = path.join(__dirname, '..', 'public', 'fotos');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'lib', 'fotos.json');

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);
const VIDEO_EXTENSIONS = new Set(['.mp4', '.webm', '.mov']);

function cleanTitle(folderName) {
  // e.g. "Fotos con Alam" -> "Alam"
  // "Fotos de Kary en el Espectro" -> "Kary en el Espectro"
  return folderName
    .replace(/^Fotos con\s+/i, '')
    .replace(/^Fotos de\s+/i, '');
}

function getSlug(folderName) {
  return cleanTitle(folderName)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

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

function run() {
  if (!fs.existsSync(FOTOS_DIR)) {
    console.error(`Directory not found: ${FOTOS_DIR}`);
    process.exit(1);
  }

  // Predefined order as requested in prompt:
  const order = [
    'Fotos con Alam',
    'Fotos con Asleyri',
    'Fotos con Bryan',
    'Fotos con Carina y Daniel',
    'Fotos con Gente Que te Quiere',
    'Fotos con Leslie',
    'Fotos con Ronel',
    'Fotos de Kary en el Espectro'
  ];

  const folders = fs.readdirSync(FOTOS_DIR).filter(f => {
    return fs.statSync(path.join(FOTOS_DIR, f)).isDirectory();
  });

  // Sort according to order array, items not in order array go to the end
  folders.sort((a, b) => {
    let indexA = order.indexOf(a);
    let indexB = order.indexOf(b);
    if (indexA === -1) indexA = 99;
    if (indexB === -1) indexB = 99;
    return indexA - indexB;
  });

  const sections = [];

  for (const folder of folders) {
    const folderPath = path.join(FOTOS_DIR, folder);
    const files = getAllFiles(folderPath);

    const images = [];
    const videos = [];

    const mp4Bases = new Set(
      files
        .filter(f => path.extname(f).toLowerCase() === '.mp4')
        .map(f => path.basename(f, path.extname(f)).toLowerCase())
    );

    for (const filePath of files) {
      const filename = path.basename(filePath);
      if (filename.startsWith('._') || filename === '9C2FECF7-C623-4BAF-9C9B-013A9510C229.MOV') {
        continue;
      }
      const ext = path.extname(filePath).toLowerCase();
      
      // Skip .mov if a converted .mp4 exists
      if (ext === '.mov' && mp4Bases.has(path.basename(filePath, path.extname(filePath)).toLowerCase())) {
        continue;
      }

      const relativePath = '/' + path.relative(path.join(__dirname, '..', 'public'), filePath).replace(/\\/g, '/');

      if (IMAGE_EXTENSIONS.has(ext)) {
        images.push(relativePath);
      } else if (VIDEO_EXTENSIONS.has(ext)) {
        videos.push(relativePath);
      }
    }

    // Only add section if it has content
    if (images.length > 0 || videos.length > 0) {
      sections.push({
        id: getSlug(folder),
        title: cleanTitle(folder),
        folder: folder,
        images: images,
        videos: videos
      });
    }
  }

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(sections, null, 2), 'utf-8');
  console.log(`Successfully generated manifest with ${sections.length} sections at: ${OUTPUT_FILE}`);
}

run();

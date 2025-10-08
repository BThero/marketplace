import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';

const getAllRegularImages = (dirUrl: string) => {
  const regularImages = fs
    .readdirSync(dirUrl)
    .filter(
      (filename) => filename.endsWith('.jpg') || filename.endsWith('.jpeg')
    )
    .filter(
      (filename) => !filename.startsWith('min-') && !filename.startsWith('max-')
    );
  return regularImages;
};

const collectImages = () => {
  const publicUrl = path.resolve('./public');
  const itemsUrl = `${publicUrl}/items`;
  const images = getAllRegularImages(itemsUrl);
  return [itemsUrl, images];
};

const ensureExists = (dir: string) => {
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch {}
};

const processImages = async () => {
  const [dirUrl, imageNames] = collectImages();
  for (const name of imageNames) {
    console.log(`processing image ${name}...`);
    const url = `${dirUrl}/${name}`;
    ensureExists(`${dirUrl}/min`);
    ensureExists(`${dirUrl}/max`);
    await sharp(url)
      .resize({ width: 500, withoutEnlargement: true })
      .toFile(`${dirUrl}/min/${name}`);
    await sharp(url)
      .resize({ width: 1200, withoutEnlargement: true })
      .toFile(`${dirUrl}/max/${name}`);
  }
  console.log('done!');
};

processImages();

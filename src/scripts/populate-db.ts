import { db } from '@/db/drizzle.js';
import { item } from '@/db/schema.js';
import fs from 'node:fs';
import path from 'node:path';

const capitalize = (name: string) => {
  return name
    .split('_')
    .map((part) => {
      return part[0].toUpperCase() + part.substring(1);
    })
    .join(' ');
};

const getAllImages = (dirUrl: string) => {
  const images = fs
    .readdirSync(dirUrl)
    .filter(
      (filename) => filename.endsWith('.jpg') || filename.endsWith('.jpeg')
    );
  return images;
};

const collectImages = () => {
  const publicUrl = path.resolve('./public');
  const images = getAllImages(`${publicUrl}/items/min`);
  return images;
};

const populateDB = async () => {
  const images = collectImages();
  for (const name of images) {
    const imageUrl = `/items/${name}`;
    const nameWithoutExtension = name.split('.').slice(0, -1).join('.');
    const title = capitalize(nameWithoutExtension);
    console.log(`inserting image ${name} with title ${title}...`);
    await db.insert(item).values({ imageUrl, title });
  }
  console.log('done!');
};

populateDB();

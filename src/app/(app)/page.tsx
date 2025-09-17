import { db } from '../../db/drizzle';
import { readdirSync } from 'fs';
import { item as itemTable } from '../../db/schema';
import assert from 'assert';
import { Item } from './Item';
import { Metadata } from 'next';

const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const populateItems = async () => {
  const files = readdirSync('public/items');
  await db.delete(itemTable);

  for (const file of files) {
    assert(
      file.endsWith('.jpg') || file.endsWith('.jpeg'),
      'All items should be in .jpg format'
    );
    const extLength = file.endsWith('.jpg') ? 4 : 5;
    await db.insert(itemTable).values({
      imageUrl: `/items/${file}`,
      title: capitalize(
        file.substring(0, file.length - extLength).replaceAll('_', ' ')
      ),
    });
  }
};

export const metadata: Metadata = {
  title: "Tim's Marketplace",
};

const Home = async () => {
  const items = await db.query.item.findMany({
    orderBy: [itemTable.title],
    where: (fields, operators) => {
      return operators.eq(fields.isClaimed, false);
    },
  });
  return (
    <main className="flex-1 w-full flex flex-col items-center gap-4 p-2">
      <header>
        <h1 className="typography-h1">Tim&apos;s Marketplace</h1>
        <ul className="list-disc list-inside typography-list">
          <li>All items are free</li>
        </ul>
      </header>
      <div className="grid grid-cols-3 gap-4 w-[1000px] max-sm:grid-cols-1 max-sm:w-full max-lg:grid-cols-2 max-lg:w-full">
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </div>
    </main>
  );
};

export const dynamic = 'force-dynamic';

export default Home;

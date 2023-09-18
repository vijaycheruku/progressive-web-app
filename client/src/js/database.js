import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

//  logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error('putDb implementation');
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const objst = tx.objectStore('jate');
  const request = objst.put({ id: 1, value: content });
  const result = await request;
};

// logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('getDb implementation');
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const objst = tx.objectStore('jate');
  const request = objst.getAll();
  const result = await request;
  return result?.value;
};

initdb();

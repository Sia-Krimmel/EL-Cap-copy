import Airtable from 'airtable';

import * as Server from 'common/middleware';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

export default async function apiAirtableReadingList(req, res) {
  await Server.cors(req, res);
  const tableId = process.env.ARTICLES_LIST_TABLE_ID;

  try {
    const base = new Airtable({ apiKey: process.env.READING_LIST_TOKEN }).base(process.env.READING_LIST_BASE_ID!);
    const records = await base(tableId).select().all();

    res.json({ records });
  } catch (e) {
    console.log(e);
    res.json({ error: true });
  }
}

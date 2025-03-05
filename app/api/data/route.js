import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET() {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'toniumdb',
    password: '1113',
    port: 1488,
  });

  try {
    await client.connect();
    const result = await client.query('SELECT * FROM records');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await client.end();
  }
}
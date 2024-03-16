import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');
  console.log(address);
  try {
    if (!address) throw new Error('address is required');
    await sql`INSERT INTO USERS (address, ensName, email, ouraToken, ouraTokenExpiresAt) VALUES (${address}, danENSTEST, test@test.com, gbcshjgfdbvcdfs, null);`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const users = await sql`SELECT * FROM USERS;`;
  return NextResponse.json({ users }, { status: 200 });
}

import { NextResponse } from 'next/server'
import { hash } from 'bcrypt'

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const hashedPassword = await hash(password, 10);

  console.log("User:", username, " Hashed Password:", hashedPassword);
  // Save it to the db
  
  return NextResponse.json({ message: 'User registered' }, { status: 201 })
}
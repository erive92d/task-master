import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest, res: NextResponse) {
    
    const { email, username, password } = await req.json()
    console.log(email, username, password)
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

  try {

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    return new NextResponse(JSON.stringify(newUser), { status: 200 })
  } catch (error) {
    return new NextResponse("Error", { status: 500 })
  } finally {
    await prisma.$disconnect();
  }
}
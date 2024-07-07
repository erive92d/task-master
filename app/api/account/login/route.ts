import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest, res: NextResponse) {
    

  try {

    const { email, password } = await req.json()

    if (!email || !password) {
        return new NextResponse("Email and password are required", { status: 400 });
      }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
        console.log("No user found");
        return new NextResponse("No user found", { status: 404 });
      }

    const confirmPassword = await bcrypt.compare(password, user.password)
   
    if (!confirmPassword) {
        console.log("Wrong password");
        return new NextResponse("Wrong password", { status: 402 });
      }

    return new NextResponse(JSON.stringify(user), { status: 200 })
    
  } catch (error) {
    return new NextResponse("Error", { status: 500 })
  } finally {
    await prisma.$disconnect();
  }
}
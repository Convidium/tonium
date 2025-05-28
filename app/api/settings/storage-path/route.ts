import { PrismaClient } from '@prisma/client';
import { getDefaultStoragePath } from '@/app/api/utils/paths';
import fsPromises from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../utils/prisma';

interface StoragePathResponse {
  storagePath: string;
  isDefault?: boolean;
  message?: string;
  error?: string;
  details?: string;
}

export async function GET(request: NextRequest) {
  try {
    const settings = await prisma.settings.findFirst();

    if (settings && settings.storagePath) {
      return NextResponse.json<StoragePathResponse>({ storagePath: settings.storagePath, isDefault: false });
    } else {
      const defaultPath = getDefaultStoragePath();
      return NextResponse.json<StoragePathResponse>({ storagePath: defaultPath, isDefault: true });
    }
  } catch (error: any) {
    console.error('Failed when getting storage folder path', error);
    const defaultPath = getDefaultStoragePath();
    return NextResponse.json<StoragePathResponse>(
      { error: 'Couldn\'t get storage folder path', storagePath: defaultPath, isDefault: true, details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body: { storagePath?: string } = await request.json();
  const { storagePath } = body;

  if (!storagePath) {
    return NextResponse.json<StoragePathResponse>({
        error: 'Шлях збереження є обов\'язковим.',
        storagePath: ''
    }, { status: 400 });
  }

  try {
    await fsPromises.mkdir(storagePath, { recursive: true });

    const settings = await prisma.settings.upsert({
      where: { id: 1 },
      update: { storagePath: storagePath },
      create: { id: 1, storagePath: storagePath },
    });

    return NextResponse.json<StoragePathResponse>({ message: 'Storage folder path has been sucsessfully updated!', storagePath: settings.storagePath });
  } catch (error: any) {
    console.error('Failed when setting storage folder path:', error);
    return NextResponse.json<StoragePathResponse>({
        error: 'Couldn\'t set storage folder path', details: error.message,
        storagePath: ''
    }, { status: 500 });
  }
}
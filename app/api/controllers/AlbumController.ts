import { InputAlbumData } from '@/app/api/types/InputDefinitions';
import { AlbumService } from '@/app/api/services/AlbumService';
import { NextRequest, NextResponse } from 'next/server';
import { RequestParser } from '../utils/RequestParser';
import { FileService } from '../services/FileService';


const fileService = new FileService();

export class AlbumController {
  private albumService: AlbumService;
  private service = new AlbumService();

  constructor() {
    this.albumService = new AlbumService();
  }


  async createAlbum(formData: FormData) {
    const albumJson = formData.get('album_data');
    if (!albumJson || typeof albumJson !== 'string') {
      return NextResponse.json({ error: 'Invalid album data' }, { status: 400 });
    }
    const albumData: InputAlbumData = JSON.parse(albumJson as string);

    console.log('[Controller] Creating an album:', albumData.name);
    const frontCover = formData.get('front_cover') as File | null;
    const backCover = formData.get('back_cover') as File | null;
    const audioFiles = formData.getAll('audiofiles') as File[];

    if (frontCover) {
      albumData.front_cover_path = await fileService.save(frontCover, 'covers');
    }
    if (backCover) {
      albumData.back_cover_path = await fileService.save(backCover, 'covers');
    }
    if (albumData.tracks && audioFiles.length === albumData.tracks.length) {
      for (let i = 0; i < albumData.tracks.length; i++) {
        albumData.tracks[i].track.track_path = await fileService.save(audioFiles[i], 'audiofiles');
      }
    }

    const album = await this.albumService.createAlbum(albumData);
    console.log('[Controller] The Album has beend created, id =', album.id);
    return album;
  }


  async getAlbums(req: NextRequest) {
    const parser = new RequestParser(req);
    const fullQuery = parser.parseQueryParams();

    return await this.service.getAlbums(fullQuery);
  }

  async getAlbum(req: NextRequest) {
    const parser = new RequestParser(req);
    const fullQuery = parser.parseQueryParams();

    const id = parser.getId("albums");

    return await this.albumService.getAlbumById(Number(id), fullQuery.include);
  }

  async updateAlbum(req: NextRequest) {
    const formData = await req.formData();

    const albumJson = formData.get('album_data');
    if (!albumJson || typeof albumJson !== 'string') {
      return NextResponse.json({ error: 'Invalid album data' }, { status: 400 });
    }
    const albumData: InputAlbumData = JSON.parse(albumJson as string);

    console.log('[Controller] Updating an album:', albumData.name);
    const frontCover = formData.get('front_cover') as File | null;
    const backCover = formData.get('back_cover') as File | null;
    const audioFiles = formData.getAll('audiofiles') as File[];

    if (frontCover) {
      albumData.front_cover_path = await fileService.save(frontCover, 'covers');
    }
    if (backCover) {
      albumData.back_cover_path = await fileService.save(backCover, 'covers');
    }
    if (albumData.tracks && audioFiles.length === albumData.tracks.length) {
      for (let i = 0; i < albumData.tracks.length; i++) {
        albumData.tracks[i].track.track_path = await fileService.save(audioFiles[i], 'audiofiles');
      }
    }

    const updatedAlbum = await this.albumService.updateAlbum(albumData);
    console.log('[Controller] The Album has been updated, id =', updatedAlbum.id);
    return updatedAlbum;
  }

  async deleteAlbum(req: NextRequest) {
    const parser = new RequestParser(req);
    const id = parser.getId("albums");

    if (id === null || isNaN(id)) {
      return NextResponse.json({ error: 'Invalid album id' }, { status: 400 });
    }

    // TODO: Implement album cover, and track audio files deletion
    console.log("[Controller] The album was deleted succesfully ", id);
    return await this.albumService.deleteAlbum(id);
  }
}
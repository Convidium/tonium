import { InputAlbumData } from '@/app/api/types/InputDefinitions';
import { AlbumService } from '@/app/api/services/AlbumService';
import { NextRequest } from 'next/server';
import { RequestParser } from '../utils/RequestParser';

export class AlbumController {
  private albumService: AlbumService;
  private service = new AlbumService();

  constructor() {
    this.albumService = new AlbumService();
  }


  async createAlbum(data: InputAlbumData) {
    console.log('[Controller] Creating an album:', data.name);

    const album = await this.albumService.createAlbum(data);
    console.log('[Controller] The Album has beend created, id =', album.id);
    return album;
  }


  async getAlbums(req: NextRequest) {
    const parser = new RequestParser(req);

    const limit = parser.getLimit();
    const page = parser.getPage();
    const query = parser.getQueryParam();
    const filters = parser.getFilters();

    return await this.service.getAlbums({ limit, page, query, filters });
  }
}
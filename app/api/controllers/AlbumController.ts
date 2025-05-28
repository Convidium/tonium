import { InputAlbumData } from '@/app/api/types/InputDefinitions';
import { FileService } from '@/app/api/services/FileService';
import { AlbumService } from '@/app/api/services/AlbumService';

interface AlbumControllerDeps {
  fileService: FileService;
}

export class AlbumController {
  private albumService: AlbumService;

  constructor(private deps: AlbumControllerDeps) {
    this.albumService = new AlbumService();
  }

  async createAlbum(data: InputAlbumData) {
    console.log('[Controller] Creating an album:', data.name);

    const album = await this.albumService.createAlbum(data);
    console.log('[Controller] The Album has beend created, id =', album.id);
    return album;
  }
}
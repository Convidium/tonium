import { BaseRepository } from './BaseRepository';

export class SingleRepository extends BaseRepository<'single'> {
  constructor() {
    super('single');
  }

  async getSingleByIdWithDetails(id: number) {
    return this.prisma.single.findUnique({
      where: { id },
      include: {
        aSideTrack: true,
        bSideTrack: true,
        singleGenres: { include: { genre: true } },
        singleMoods: { include: { mood: true } },
        singleTags: { include: { tag: true } },
        singleListenHistory: true,
      },
    });
  }
}
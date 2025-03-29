export const songFilesQuery = `
    SELECT
        sf.song_id,
        sf.album_id,
        sf.song_name,
        ar.artist_name,
        rec.record_name AS album_name,
        sf.song_info,
        sf.song_audio_path,
        sf.track_number,
        rec.record_cover_path,
        rec.record_backcover_path
    FROM song_files_fts sf_fts
    JOIN song_files sf ON sf_fts.song_id = sf.song_id
    JOIN records rec ON sf_fts.album_id = rec.record_id
    JOIN artists ar ON sf.song_artist = ar.artist_id
    WHERE song_files_fts MATCH ?
    LIMIT ? OFFSET ?`;

export const recordsQuery = `
    SELECT * FROM records_fts
    WHERE record_name MATCH ? OR record_info MATCH ?
    LIMIT ? OFFSET ?`;

export const artistsQuery = `
    SELECT
        afts.artist_id,
        afts.artist_name,
        a.artist_bio,
        a.artist_logo_path,
        a.artist_bg_path
    FROM artists_fts afts
    JOIN artists a ON afts.artist_id = a.artist_id
    WHERE afts.artist_name MATCH ?
    LIMIT ? OFFSET ?`;

export const recentListenedRecordsQuery = `
    SELECT * FROM recent_listened_records_fts
    WHERE record_id MATCH ?
    LIMIT ? OFFSET ?`;
import songs from '../../public/songs';

const songMap = {};
songs.forEach((song) => {
    songMap[song.id] = song;
});

const calculateDecay = (history, halfLife, idExtractor) => {
    const now = Date.now();
    const MS_IN_A_DAY = 24 * 60 * 60 * 1000;
    const scores = {};

    history.forEach((item) => {
        const id = idExtractor(item);

        if (!id) return;

        const daysAgo = (now - item.timestamp) / MS_IN_A_DAY;
        const weight = Math.pow(0.5, daysAgo / halfLife);
        scores[id] = (scores[id] || 0) + weight;
    });

    return Object.entries(scores)
        .map(([id, score]) => ({ id, score }))
        .sort((a, b) => b.score - a.score);
};

const shuffleArray = (array) => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
};

export const getQuickPicks = (history) => {
    if (!history || !history.length) return [];

    const sortedSongs = calculateDecay(history, 1.5, (item) => item.songId);
    const qualityPool = sortedSongs.slice(0, 35);
    const shufflePool = shuffleArray(qualityPool).slice(0, 16);
    return shufflePool.map(item => {
        const song = songMap[item.id];
        return {
            id: item.id,
            type: 'song',
            score: item.score,
            metadata: song
        };
    });
};

export const getSpeedDial = (history) => {
    if (!history || !history.length) return [];

    const rankedSongs = calculateDecay(history, 7, (item) => item.songId);
    const rankedAlbums = calculateDecay(history, 7, (item) => {
        const song = songMap[item.songId];
        return song ? song.album : null;
    });
    const rankedArtists = calculateDecay(history, 7, (item) => {
        const song = songMap[item.songId];
        return song ? song.artist : null;
    });

    // Select proportional mix: 20 songs, 5 albums, 2 artists = 27 items total
    const topSongs = rankedSongs.slice(0, 20).map(item => {
        const song = songMap[item.id];
        return {
            id: item.id,
            type: 'song',
            score: item.score,
            metadata: song
        };
    });

    const topAlbums = rankedAlbums.slice(0, 5).map(item => {
        const albumName = item.id;
        const albumSongs = songs.filter(s => s.album === albumName);
        const albumInfo = {
            name: albumName,
            artist: albumSongs[0]?.artist || '',
            cover: albumSongs[0]?.cover || '',
            tracks: albumSongs
        };
        return {
            id: albumName,
            type: 'album',
            score: item.score,
            metadata: albumInfo
        };
    });

    const topArtists = rankedArtists.slice(0, 2).map(item => {
        const artistName = item.id;
        const artistSongs = songs.filter(s => s.artist === artistName);
        const artistInfo = {
            name: artistName,
            cover: artistSongs[0]?.cover || ''
        };
        return {
            id: artistName,
            type: 'artist',
            score: item.score,
            metadata: artistInfo
        };
    });

    const mixedCluster = [...topSongs, ...topAlbums, ...topArtists];

    return shuffleArray(mixedCluster);
};
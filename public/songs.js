const songs = [
  {
      id: "uuid-1", 
      artist: "Don Toliver",
      album: "OCTANE",
      title: "ATM",
      trackNumber: 6,
      year: 2026,
      genre: "Hip-Hop/Rap",
      duration: 181, 
      
      src: "/music/Don Toliver - ATM [Official Video] - (320 Kbps).mp3", 
      cover: "/icons/Octane.jpg",
      format: "mp3",
      bitrate: "320 Kbps", 
      
      mood: ["Energetic", "Dark"],
      tempo: 135, 
      playCount: 0,
      isLiked: false,
      isExplicit: true
  },
  {
    id: "uuid-2", 
    artist: "Don Toliver",
    album: "OCTANE",
    title: "Call Back",
    trackNumber: 10,
    year: 2026,
    genre: "Hip-Hop/Rap",
    duration: 123, 
    
    src: "/music/Don Toliver - Call Back [Official Visualizer] - (320 Kbps).mp3", 
    cover: "/icons/Octane.jpg",
    format: "mp3",
    bitrate: "320 Kbps", 
    
    mood: ["Atmospheric", "Melodic"],
    tempo: 128, 
    playCount: 0,
    isLiked: false,
    isExplicit: true
},
{
    id: "uuid-3", 
    artist: "Don Toliver",
    album: "Heaven Or Hell",
    title: "Cardigan",
    trackNumber: 4,
    year: 2020,
    genre: "Hip-Hop/Rap",
    duration: 159, 
    
    src: "/music/Don Toliver - Cardigan [Official Visualizer] - (320 Kbps).mp3", 
    cover: "/icons/heaven or hell.jpg",
    format: "mp3",
    bitrate: "320 Kbps", 
    
    mood: ["Atmospheric", "Melodic"],
    tempo: 142, 
    playCount: 0,
    isLiked: false,
    isExplicit: true
},
{
    id: "uuid-4", 
    artist: "Don Toliver",
    album: "OCTANE",
    title: "E85",
    trackNumber: 1,
    year: 2026,
    genre: "Alternative Hip-Hop",
    duration: 153, 
    
    src: "/music/Don Toliver - E85 [Official Visualizer] - (320 Kbps).mp3", 
    cover: "/icons/Octane.jpg",
    format: "mp3",
    bitrate: "320 Kbps", 
    
    mood: ["Euphoric", "Energetic"],
    tempo: 132, 
    playCount: 0,
    isLiked: false,
    isExplicit: true
},
{
    id: "uuid-5", 
    artist: "Don Toliver",
    album: "OCTANE",
    title: "Excavator",
    trackNumber: 13,
    year: 2026,
    genre: "Hip-Hop/Rap",
    duration: 211, 
    
    src: "/music/Don Toliver - Excavator [Official Video] - (320 Kbps).mp3", 
    cover: "/icons/Octane.jpg",
    format: "mp3",
    bitrate: "320 Kbps", 
    
    mood: ["Hypnotic", "Energetic"],
    tempo: 130, 
    playCount: 0,
    isLiked: false,
    isExplicit: true
},
{
    id: "uuid-6", 
    artist: "Don Toliver & Mustard",
    album: "FWU - Single",
    title: "FWU",
    trackNumber: 1,
    year: 2025,
    genre: "Hip-Hop/Rap",
    duration: 171, 
    
    src: "/music/Don Toliver - FWU [Official Music Video] - (320 Kbps).mp3", 
    cover: "/icons/FWU.jpg",
    format: "mp3",
    bitrate: "320 Kbps", 
    
    mood: ["Hypnotic", "Confident"],
    tempo: 130, 
    playCount: 0,
    isLiked: false,
    isExplicit: true
},
{
    id: "uuid-7", 
    artist: "Don Toliver feat. Doja Cat",
    album: "F1: The Album",
    title: "Lose My Mind",
    trackNumber: 1,
    year: 2025,
    genre: "Hip Hop/Pop",
    duration: 209, 
    
    src: "/music/Don Toliver - Lose My Mind [Official Video] - (320 Kbps).mp3", 
    cover: "/icons/F1_FRONT-COVER_FINAL.jpg",
    format: "mp3",
    bitrate: "320 Kbps", 
    
    mood: ["Cinematic", "Energetic"],
    tempo: 124, 
    playCount: 0,
    isLiked: false,
    isExplicit: true
},
{
    id: "uuid-8", 
    artist: "Don Toliver",
    album: "Heaven Or Hell",
    title: "No Idea",
    trackNumber: 2,
    year: 2019,
    genre: "Hip-Hop/Rap",
    duration: 153, 
    
    src: "/music/Don Toliver - No Idea [Official Music Video] - (320 Kbps).mp3", 
    cover: "/icons/heaven or hell.jpg",
    format: "mp3",
    bitrate: "320 Kbps",  
    
    mood: ["Hypnotic", "Melancholic"],
    tempo: 128, 
    playCount: 0,
    isLiked: false,
    isExplicit: true
},
{
    id: "uuid-9", 
    artist: "Don Toliver",
    album: "Love Sick",
    title: "No Pole",
    trackNumber: 1,
    year: 2023,
    genre: "Hip-Hop/Rap",
    duration: 187, 
    
    src: "/music/Don Toliver - No Pole [Official Music Video] - (320 Kbps).mp3", 
    cover: "/icons/LoveSick.jpg",
    format: "mp3",
    bitrate: "320 Kbps", 
    
    mood: ["Hypnotic", "Chill"],
    tempo: 178, 
    playCount: 0,
    isLiked: false,
    isExplicit: true
},
{
    id: "uuid-10", 
    artist: "Don Toliver",
    album: "OCTANE",
    title: "OPPOSITE",
    trackNumber: 15,
    year: 2026,
    genre: "Hip-Hop/Rap",
    duration: 158, 
    
    src: "/music/Don Toliver - OPPOSITE [Official Visualizer] - (320 Kbps).mp3", 
    cover: "/icons/Octane.jpg",
    format: "mp3",
    bitrate: "320 Kbps", 
    
    mood: ["Confident", "Energetic"],
    tempo: 138, 
    playCount: 0,
    isLiked: false,
    isExplicit: true
},
{
    id: "uuid-11", 
    artist: "Don Toliver feat. Rema",
    album: "OCTANE",
    title: "Secondhand",
    trackNumber: 14,
    year: 2026,
    genre: "Hip-Hop/Afrobeats",
    duration: 227, 
    
    src: "/music/Don Toliver - Secondhand (feat. Rema) - (320 Kbps).mp3", 
    cover: "/icons/Octane.jpg",
    format: "mp3",
    bitrate: "320 Kbps",
    
    mood: ["Atmospheric", "Sensual"],
    tempo: 108, 
    playCount: 0,
    isLiked: false,
    isExplicit: true
},
{
    id: "uuid-12", 
    artist: "Don Toliver",
    album: "OCTANE",
    title: "Tiramisu",
    trackNumber: 5,
    year: 2025,
    genre: "Hip-Hop/Rap",
    duration: 138, 
    
    src: "/music/Don Toliver - Tiramisu [Official Music Video] - (320 Kbps).mp3", 
    cover: "/icons/Octane.jpg",
    format: "mp3",
    bitrate: "320 Kbps",
    
    mood: ["Smooth", "Atmospheric"],
    tempo: 133, 
    playCount: 0,
    isLiked: false,
    isExplicit: true
},
{
    id: "uuid-13", 
    artist: "Don Toliver",
    album: "HARDSTONE PSYCHO",
    title: "TORE UP",
    trackNumber: 2,
    year: 2024,
    genre: "Hip-Hop/Rap",
    duration: 126, 
    
    src: "/music/Don Toliver - TORE UP [Official Audio] - (320 Kbps).mp3", 
    cover: "/icons/Hardstone Psycho.jpg",
    format: "mp3",
    bitrate: "320 Kbps",
    
    mood: ["Aggressive", "Energetic"],
    tempo: 155, 
    playCount: 0,
    isLiked: false,
    isExplicit: true
},
{
    id: "uuid-14", 
    artist: "Don Toliver",
    album: "Life of a Don",
    title: "You",
    trackNumber: 14,
    year: 2021,
    genre: "Hip-Hop/Rap",
    duration: 213, 
    
    src: "/music/Don Toliver - You [Official Audio] - (320 Kbps).mp3", 
    cover: "/icons/Life of a Don.jpg",
    format: "mp3",
    bitrate: "320 Kbps", 
    
    mood: ["Sensual", "Atmospheric"],
    tempo: 118, 
    playCount: 0,
    isLiked: false,
    isExplicit: true
},
{
    id: "uuid-15", 
    artist: "Lithe feat. Don Toliver",
    album: "Euphoria",
    title: "Cannonball",
    trackNumber: 4,
    year: 2025,
    genre: "Hip-Hop/R&B",
    duration: 144, 
    
    src: "/music/Lithe & Don Toliver - Cannonball (Official Music Video) - (320 Kbps).mp3", 
    cover: "/icons/Euphoria.jpg",
    format: "mp3",
    bitrate: "320 Kbps", 
    
    mood: ["Hypnotic", "Dark"],
    tempo: 122, 
    playCount: 0,
    isLiked: false,
    isExplicit: true
}
];

export default songs;
export interface Photo {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  span?: "tall" | "wide" | "normal";
}

export interface Video {
  id: string;
  src: string;
  poster: string;
  title: string;
  description?: string;
}

export interface MemoryEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  image: string;
}

export interface Shayri {
  id: string;
  lines: string[];
}

export interface Wish {
  id: string;
  title: string;
  emoji: string;
  description: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  src: string;
}

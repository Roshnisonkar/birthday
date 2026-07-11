import { Video } from "@/types";

/**
 * Drop local .mp4 files into /public/videos/ and matching poster
 * thumbnails into /public/photos/, or update the paths below.
 */
export const videos: Video[] = [
  {
    id: "v1",
    src: "/videos/video1.mp4",
    poster: "/photos/photo5.jpg",
    title: "Happy Birthday, Little Star",
    description: "A short film of everyone who loves you, just for today.",
  },
];

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Music2,
  X,
} from "lucide-react";

/**
 * Drop local mp3s into /public/music/ matching these filenames,
 * or edit the list below.
 */
const PLAYLIST = [
  { id: "t1", title: "A Song For You", artist: "Family Playlist", src: "/music/SONG.mpeg" },
];

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);

  const track = PLAYLIST[trackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = muted ? 0 : volume;
  }, [volume, muted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => undefined);
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const changeTrack = (dir: 1 | -1) => {
    setTrackIndex((i) => (i + dir + PLAYLIST.length) % PLAYLIST.length);
    setPlaying(false);
    setTimeout(() => {
      audioRef.current?.play().catch(() => undefined);
      setPlaying(true);
    }, 150);
  };

  const onTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setProgress(audio.currentTime);
    setDuration(audio.duration || 0);
  };

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Number(e.target.value);
    setProgress(Number(e.target.value));
  };

  const format = (t: number) => {
    if (!isFinite(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="fixed bottom-28 right-5 z-[70] sm:bottom-32 sm:right-6">
      <audio
  ref={audioRef}
  src={track.src}
  autoPlay
  loop
  onTimeUpdate={onTimeUpdate}
  onLoadedMetadata={onTimeUpdate}
/>

      <AnimatePresence mode="wait">
        {expanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="glass-card w-72 rounded-2xl p-5 shadow-gold-lg sm:w-80"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-body text-xs uppercase tracking-widest text-gold/80">
                Now Playing
              </span>
              <button
                onClick={() => setExpanded(false)}
                aria-label="Minimize player"
                className="rounded-full p-1 text-muted hover:text-gold"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-4 flex items-center gap-3">
              <motion.div
                animate={{ rotate: playing ? 360 : 0 }}
                transition={{ duration: 6, repeat: playing ? Infinity : 0, ease: "linear" }}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-gradient shadow-gold"
              >
                <Music2 className="h-5 w-5 text-obsidian" />
              </motion.div>
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-semibold text-ivory">
                  {track.title}
                </p>
                <p className="truncate font-body text-xs text-muted">{track.artist}</p>
              </div>
            </div>

            <input
              type="range"
              min={0}
              max={duration || 0}
              value={progress}
              onChange={onSeek}
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#D4AF37]"
              aria-label="Seek"
            />
            <div className="mt-1 flex justify-between font-body text-[10px] text-muted">
              <span>{format(progress)}</span>
              <span>{format(duration)}</span>
            </div>

            <div className="mt-4 flex items-center justify-center gap-5">
              <button onClick={() => changeTrack(-1)} aria-label="Previous track" className="text-ivory hover:text-gold">
                <SkipBack className="h-5 w-5" />
              </button>
              <button
                onClick={togglePlay}
                aria-label={playing ? "Pause" : "Play"}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-gradient text-obsidian shadow-gold"
              >
                {playing ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
              </button>
              <button onClick={() => changeTrack(1)} aria-label="Next track" className="text-ivory hover:text-gold">
                <SkipForward className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button onClick={() => setMuted((m) => !m)} aria-label={muted ? "Unmute" : "Mute"} className="text-muted hover:text-gold">
                {muted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  setMuted(false);
                }}
                className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/10 accent-[#D4AF37]"
                aria-label="Volume"
              />
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setExpanded(true)}
            aria-label="Open music player"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient shadow-gold-lg"
          >
            <motion.div
              animate={{ rotate: playing ? 360 : 0 }}
              transition={{ duration: 6, repeat: playing ? Infinity : 0, ease: "linear" }}
            >
              <Music2 className="h-6 w-6 text-obsidian" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

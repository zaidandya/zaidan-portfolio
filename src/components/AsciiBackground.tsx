import { useEffect, useRef } from 'react';

interface AsciiBackgroundProps {
  isPlaying: boolean;
  objectFit?: 'cover' | 'contain';
}

const MAIN_VIDEO_SRC = '/assets/aistudio/devault-ascii-tiles-u-g0orqyuo_d242c892.mp4';

export function AsciiBackground({
  isPlaying,
  objectFit = 'cover',
}: AsciiBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Ignore autoplay restriction errors when muted playback is blocked
        });
      }
    } else {
      video.pause();
    }
  }, [isPlaying]);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden bg-[#050505] pointer-events-none select-none"
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        src={MAIN_VIDEO_SRC}
        autoPlay={isPlaying}
        loop
        muted
        playsInline
        preload="auto"
        className={`h-full w-full object-center transition-opacity duration-300 ${
          objectFit === 'contain' ? 'object-contain' : 'object-cover'
        }`}
      />
    </div>
  );
}

import { useEffect, useRef } from "react";
import Hls from "hls.js";

interface HLSPlayerProps {
  url: string;
}

export default function HLSPlayer({ url }: HLSPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      if (videoRef.current) {
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current && videoRef.current.play();
        });
      }
      return () => hls.destroy();
    } else if (
      videoRef.current &&
      videoRef.current.canPlayType("application/vnd.apple.mpegurl")
    ) {
      videoRef.current.src = url;
      videoRef.current.addEventListener("loadedmetadata", () => {
        videoRef.current && videoRef.current.play();
      });
    }
  }, [url]);

  return <video ref={videoRef} controls style={{ width: "100%" }} />;
}

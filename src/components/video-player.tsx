interface VideoPlayerProps {
  src: string;
}

export default function VideoPlayer({ src }: VideoPlayerProps) {
  return (
    <div className={"border-5 rounded-lg"} style={{ height: "100%" }}>
      <video
        style={{ height: "100%", width: "100%" }}
        controls
        preload="auto"
        loop
        autoPlay
        playsInline
        muted
        key={src}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

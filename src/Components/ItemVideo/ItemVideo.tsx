import { useEffect, useState, useRef } from "react";
import { useAppDispatch , useAppSelector} from "../../Hooks/store";
import { setWatchedToEnd } from "../../store/createSlice";
import Hls from "hls.js";
import Loader from "../Loader/Loader";

interface Props {
  videoUrl: string,
  poster?: string,
  muted?: boolean
}

const HlsPlayer: React.FC<Props> = ({ videoUrl ,poster,muted}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const [speed, setSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
 const {ended} = useAppSelector(state => state.store as any)

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current?.play();
          setIsLoading(false);
        });
        hlsRef.current = hls;
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = videoUrl;
      
        videoRef.current.addEventListener('loadedmetadata', () => {
          videoRef.current?.play();
          setIsLoading(false);
        });
      }
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [videoUrl,isLoading]);
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "1":
          setSpeed(0);
          break;
        case "2":
          setSpeed(0.5);
          break;
        case "3":
          setSpeed(1);
          break;
        case "4":
          setSpeed(1.5);
          break;
        case "5":
          setSpeed(2);
          break;

        default:
          setSpeed(1);
          break;
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      videoRef.current.currentTime = currentTime;
    }
    
  }, [speed,currentTime]);
console.log(isLoading);
  useEffect(() => {
    const storedTime = localStorage.getItem(`video-${videoUrl}`);
    const storedWatchedToEnd = localStorage.getItem(`${videoUrl}ended`);

    if (storedTime) {
      setCurrentTime(parseFloat(storedTime));
    }
   

    const videoElement = videoRef.current;
  
    const timeHandler =() => {
      localStorage.setItem(`video-${videoUrl}`,Math.floor(videoElement?.currentTime as any).toString());
    }
    const endedHandler = () => {
      dispatch(setWatchedToEnd([...ended,videoUrl]));
      localStorage.setItem(`${videoUrl}ended`, `${videoUrl}ended`);
    };

    videoElement?.addEventListener("ended", endedHandler);
    videoElement?.addEventListener("timeupdate",timeHandler)
    return () => {
      videoElement?.removeEventListener('ended', endedHandler);
      videoElement?.removeEventListener("timeupdate",timeHandler)
    }
  }, [videoUrl]);

  return (
    <div className="video__wrapper">
      {isLoading && <Loader />}
      <video ref={videoRef} poster={poster && ""} autoPlay={false} controls muted={muted} ></video>
    </div>
  )
};

export default HlsPlayer;

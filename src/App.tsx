import { useState, useEffect, useRef } from "react";
import MemoryQuiz from "./components/MemoryQuiz";
import {
  Play,
  Pause,
  Heart,
  Waves,
  Flower,
  Mountain,
  TreePine,
} from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function App() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isCountdownComplete, setIsCountdownComplete] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const celebrationAudioRef = useRef<HTMLAudioElement>(null);

  const targetDate = new Date("2025-07-12T00:00:00+05:30").getTime();

  const photos = Array.from({ length: 72 }, (_, i) => `/photos/${i + 1}.jpg`);

  const memories = [
    {
      title: "Graduation Day",
      description:
        "The day we took our first photo — the beginning of countless memories 💖✨",
      image: "/photos/main/mem-1.jpg",
    },
    {
      title: "Evening Snaps",
      description:
        "One of the first memories where we took lots of snap selfies together 💞✨",
      image: "/photos/main/mem-4.jpg",
    },
    {
      title: "Cafe Tour",
      description:
        "Had one of the first cafe experience after coming to E-city",
      image: "/photos/main/mem-5.jpg",
    },
    {
      title: "Midi Snap",
      description:
        "The first time I saw you as a woman — and it changed everything. 💫❤️",
      image: "/photos/main/mem-6.jpg",
    },
    {
      title: "Early morning bliss",
      description:
        "Was shocked to see you in my sweater… but you made cozy look cool 😄❤️",
      image: "/photos/main/mem-7.jpg",
    },
    {
      title: "First temple visit",
      description:
        "The peace we shared was nothing short of phenomenal — like the world paused just for us 🤍✨",
      image: "/photos/main/mem-2.jpg",
    },
    {
      title: "First Movie Night",
      description:
        "A thrilling movie with a pinch of goosebumps and a whole lot of hand-squeezing 🎬",
      image: "/photos/main/mem-8.jpg",
    },
    {
      title: "First time felt at home",
      description:
        "You went the extra mile for me that day — and I felt every step of your love ✨",
      image: "/photos/main/mem-9.jpg",
    },
    {
      title: "First Birthday Party",
      description:
        "Burgers and softies — what else was missing? Just a little more time with you ❤️",
      image: "/photos/main/mem-10.jpg",
    },
    {
      title: "First time apart after our bond",
      description:
        "Had an overflow of feelings after my confession — heart full, words few ❤️‍🔥",
      image: "/photos/main/mem-11.jpg",
    },
    {
      title: "Short ride to eat softie",
      description:
        "First impromptu plan, and it ended with a softie as sweet as the memory 💖",
      image: "/photos/main/mem-12.jpg",
    },
    {
      title: "Lawn Memories",
      description:
        "Sharing the same earphones, same music taste, and a little piece of heart too 🎧💞🎶",
      image: "/photos/main/mem-13.jpg",
    },
    {
      title: "First proper evening",
      description:
        "Still remember how you were in such a rush… but somehow we made time for Ice-cream 🍰❤️",
      image: "/photos/main/mem-3.jpg",
    },
    {
      title: "First home-made burger",
      description: "At least the patty wasn't burnt… that's a win, right? 😅",
      image: "/photos/main/mem-14.jpg",
    },
    {
      title: "Beach hungama",
      description: "Sun, sea, and my Rowdy Baby by my side ☀️🌊❤️",
      image: "/photos/main/mem-16.jpg",
    },
    {
      title: "Warm morning ride",
      description:
        "Cold air, warm palms… do you remember the doves flying away? ❄️❤️ A moment etched in heart.",
      image: "/photos/main/mem-17.jpg",
    },
    {
      title: "First Dinner at Fine Dine",
      description:
        "Still sorry for being such a crybaby 😢💔 but thank you for holding me through it 🤍",
      image: "/photos/main/mem-18.jpg",
    },
    {
      title: "Fishy Fish",
      description: "Never saw a more curious you than this 🤔💫",
      image: "/photos/main/mem-19.jpg",
    },
    {
      title: "Small Oath",
      description: "Oath to never eat fish when I'm with you 🐟❤️",
      image: "/photos/main/mem-20.jpg",
    },
    {
      title: "Full filmy vibes",
      description:
        "Drenched in rain, soaked in love — fort memories forever 💙☔",
      image: "/photos/main/mem-21.jpg",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setIsCountdownComplete(true);
        clearInterval(timer);

        // Stop calm music
        if (audioRef.current) {
          audioRef.current.pause();
        }

        // Play celebration music & reflect that it's playing
        if (celebrationAudioRef.current) {
          celebrationAudioRef.current.play();
          setIsPlaying(true); // Important!
        }

        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  useEffect(() => {
    // Auto-play background music when component mounts
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Auto-play failed, user needs to interact first
          setIsPlaying(false);
        });
    }
  }, []);

  const toggleAudio = async () => {
    const audio = isCountdownComplete
      ? celebrationAudioRef.current
      : audioRef.current;

    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Audio play/pause failed:", err);
    }
  };

  if (isCountdownComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 text-blue-200 opacity-20 animate-float">
            <Waves size={60} />
          </div>
          <div className="absolute top-1/4 right-10 text-teal-200 opacity-25 animate-float delay-1000">
            <TreePine size={50} />
          </div>
          <div className="absolute bottom-1/4 left-20 text-blue-300 opacity-20 animate-float delay-2000">
            <Mountain size={70} />
          </div>
          <div className="absolute bottom-10 right-20 text-seafoam-200 opacity-25 animate-float delay-500">
            <Flower size={45} />
          </div>
        </div>

        <div className="fixed top-6 right-6 z-50 flex flex-col items-center space-y-1">
          <button
            onClick={toggleAudio}
            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <span className="text-xs text-white/30 mt-1">
            Click here to {isPlaying ? "mute" : "play"} the music
          </span>
        </div>

        {/* Main content */}
        <div className="relative z-10 min-h-screen">
          {/* Hero Section */}
          <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl animate-fade-in">
                Wish you many many happy returns of the day Muddu 🫶🤍🐾
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 font-light mb-8 animate-fade-in delay-300">
                Hope your special day brings you all the happiness you deserve
                😇✨
              </p>
              <div className="flex justify-center space-x-4 text-pink-300 animate-fade-in delay-500">
                <Heart className="animate-pulse" size={30} />
                <Heart className="animate-pulse delay-300" size={30} />
                <Heart className="animate-pulse delay-700" size={30} />
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-2xl animate-fade-in delay-700">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-semibold text-white">
                  Time's up, Scroll Down
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl md:text-6xl font-bold text-white mb-2">
                    {timeLeft.days}
                  </div>
                  <div className="text-blue-200 text-sm uppercase tracking-wide">
                    Days
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-6xl font-bold text-white mb-2">
                    {timeLeft.hours}
                  </div>
                  <div className="text-blue-200 text-sm uppercase tracking-wide">
                    Hours
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-6xl font-bold text-white mb-2">
                    {timeLeft.minutes}
                  </div>
                  <div className="text-blue-200 text-sm uppercase tracking-wide">
                    Minutes
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-6xl font-bold text-white mb-2">
                    {timeLeft.seconds}
                  </div>
                  <div className="text-blue-200 text-sm uppercase tracking-wide">
                    Seconds
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Short Video */}
          <section className="w-full max-w-4xl mb-12 mx-auto px-4">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
              <h3 className="text-2xl font-semibold text-white mb-4 text-center">
                Here's a small video from me 😁
              </h3>
              <div className="overflow-hidden rounded-2xl shadow-lg border border-white/10">
                <video
                  controls
                  autoPlay
                  loop
                  className="w-full h-auto object-cover rounded-2xl"
                >
                  <source src="/videos/video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </section>

          {/* Memory Lane Section */}
          <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Our Beautiful Journey
                </h2>
                <p className="text-xl text-blue-100">
                  Every moment with you has been a treasure worth remembering.
                </p>
                <p className="text-xl text-blue-100">
                  (Hover over each memory to see a short message)
                </p>
              </div>
              <div className="columns-2 md:columns-3 gap-4 space-y-4">
                {memories.map((memory, index) => (
                  <div
                    key={index}
                    className="break-inside-avoid relative overflow-hidden rounded-2xl group shadow-xl transition-transform duration-500 hover:scale-105"
                  >
                    <img
                      src={memory.image}
                      alt={memory.title}
                      className="w-full h-auto object-contain rounded-2xl transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 rounded-2xl">
                      <h3 className="text-white text-lg font-semibold mb-1">
                        {memory.title}
                      </h3>
                      <p className="text-blue-100 text-sm">
                        {memory.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Photo Gallery Section */}
          <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Captured Smiles
                </h2>
                <p className="text-xl text-blue-100">
                  These pictures hold a thousand words of joy and laughter
                </p>
              </div>
              {/* Masonry Grid */}
              <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {photos.map((photo, index) => (
                  <div key={index} className="break-inside-avoid mb-4">
                    <img
                      src={photo}
                      alt={`Gallery ${index + 1}`}
                      className="w-full rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <MemoryQuiz />

          {/* Special Message Section */}
          <section className="py-20 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                From the Heart
              </h2>
              <div className="bg-white/20 backdrop-blur-md rounded-3xl p-12 shadow-2xl">
                <p className="text-2xl md:text-3xl text-white leading-relaxed mb-8">
                  "Dear Muddu, on this special day, I want you to know how
                  grateful I am to have you in my life. Your kindness, laughter,
                  and beautiful spirit light up every room you enter. May this
                  new year of your life be filled with endless joy, amazing
                  adventures, and all the happiness your heart can hold."
                </p>
                <div className="flex justify-center space-x-6 text-pink-300">
                  <Heart className="animate-pulse" size={40} />
                  <Heart className="animate-pulse delay-300" size={40} />
                  <Heart className="animate-pulse delay-700" size={40} />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Audio elements */}
        <audio ref={audioRef} loop preload="auto">
          <source src="/music/nature-sounds.mp3" type="audio/mpeg" />
        </audio>
        <audio ref={celebrationAudioRef} loop preload="auto">
          <source src="/music/celebration-music.mp3" type="audio/mpeg" />
        </audio>

        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out forwards;
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-celebration-pop {
            animation: celebration-pop 0.8s ease-out;
          }
          @keyframes celebration-pop {
            0% {
              transform: scale(0.95);
              opacity: 0.8;
            }
            50% {
              transform: scale(1.05);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          .delay-300 {
            animation-delay: 0.3s;
          }
          .delay-500 {
            animation-delay: 0.5s;
          }
          .delay-700 {
            animation-delay: 0.7s;
          }
          .delay-1000 {
            animation-delay: 1s;
          }
          .delay-2000 {
            animation-delay: 2s;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-blue-200 opacity-20 animate-float">
          <Waves size={60} />
        </div>
        <div className="absolute top-1/4 right-10 text-teal-200 opacity-25 animate-float delay-1000">
          <TreePine size={50} />
        </div>
        <div className="absolute bottom-1/4 left-20 text-blue-300 opacity-20 animate-float delay-2000">
          <Mountain size={70} />
        </div>
        <div className="absolute bottom-10 right-20 text-seafoam-200 opacity-25 animate-float delay-500">
          <Flower size={45} />
        </div>
      </div>

      {/* Audio controls */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleAudio}
          className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl animate-fade-in">
              The clock is ticking toward something truly special...
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 font-light mb-8 animate-fade-in delay-300">
              A day filled with love, memories, and heartfelt wishes. Stay with
              me, something beautiful is on its way.
            </p>
            <div className="flex justify-center space-x-4 text-pink-300 animate-fade-in delay-500">
              <Heart className="animate-pulse" size={30} />
              <Heart className="animate-pulse delay-300" size={30} />
              <Heart className="animate-pulse delay-700" size={30} />
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-2xl animate-fade-in delay-700">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-semibold text-white">Reveal in</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl md:text-6xl font-bold text-white mb-2">
                  {timeLeft.days}
                </div>
                <div className="text-blue-200 text-sm uppercase tracking-wide">
                  Days
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-6xl font-bold text-white mb-2">
                  {timeLeft.hours}
                </div>
                <div className="text-blue-200 text-sm uppercase tracking-wide">
                  Hours
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-6xl font-bold text-white mb-2">
                  {timeLeft.minutes}
                </div>
                <div className="text-blue-200 text-sm uppercase tracking-wide">
                  Minutes
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-6xl font-bold text-white mb-2">
                  {timeLeft.seconds}
                </div>
                <div className="text-blue-200 text-sm uppercase tracking-wide">
                  Seconds
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Audio elements */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/music/nature-sounds.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={celebrationAudioRef} loop preload="auto">
        <source src="/music/celebration-music.mp3" type="audio/mpeg" />
      </audio>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-celebration-pop {
          animation: celebration-pop 0.8s ease-out;
        }
        @keyframes celebration-pop {
          0% {
            transform: scale(0.95);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}

export default App;

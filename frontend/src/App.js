import { useState, useRef, useEffect } from "react";
import "@/App.css";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Plane, Sparkles } from "lucide-react";

function App() {
  const [stage, setStage] = useState("intro"); // intro, question, celebration
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noAttempts, setNoAttempts] = useState(0);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const noButtonRef = useRef(null);

  const moveNoButton = () => {
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    const buttonWidth = 120;
    const buttonHeight = 50;
    
    const maxX = viewport.width - buttonWidth - 40;
    const maxY = viewport.height - buttonHeight - 40;
    
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    setNoButtonPosition({ x: newX, y: newY });
    setNoAttempts(prev => prev + 1);
    setYesButtonSize(prev => Math.min(prev + 0.15, 2));
  };

  const handleYesClick = () => {
    setStage("celebration");
    
    // Confetti explosion
    const duration = 4000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#B76E79', '#FFD1DC', '#D4AF37', '#73C2FB']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#B76E79', '#FFD1DC', '#D4AF37', '#73C2FB']
      });
    }, 250);

    // Heart burst
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#ff69b4', '#ff1493'],
        shapes: ['circle'],
        scalar: 1.2
      });
    }, 500);
  };

  useEffect(() => {
    if (stage === "intro") {
      const timer = setTimeout(() => {
        setStage("question");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const getNoButtonText = () => {
    if (noAttempts === 0) return "No";
    if (noAttempts < 3) return "Try again!";
    if (noAttempts < 5) return "Nice try! 🙄";
    if (noAttempts < 8) return "Nope! 😏";
    return "Dubai? ✈️";
  };

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="stage-container intro-stage"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 1.5, bounce: 0.5 }}
              className="intro-content"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Heart className="intro-heart" size={80} fill="#B76E79" color="#B76E79" />
              </motion.div>
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="intro-title"
              >
                Hey Minnu...
              </motion.h1>
            </motion.div>
          </motion.div>
        )}

        {stage === "question" && (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="stage-container question-stage"
          >
            <div className="floating-hearts">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="floating-heart"
                  initial={{ 
                    y: window.innerHeight,
                    x: Math.random() * window.innerWidth,
                    opacity: 0.3
                  }}
                  animate={{ 
                    y: -100,
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: Math.random() * 5 + 5,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                    ease: "linear"
                  }}
                >
                  ❤️
                </motion.div>
              ))}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={`emoji-${i}`}
                  className="floating-heart"
                  initial={{ 
                    y: window.innerHeight,
                    x: Math.random() * window.innerWidth,
                    opacity: 0.4
                  }}
                  animate={{ 
                    y: -100,
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: Math.random() * 6 + 4,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "linear"
                  }}
                >
                  🙄
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="question-content"
            >
              <motion.h1 
                className="question-title"
                animate={{ 
                  textShadow: [
                    "0 0 20px rgba(183, 110, 121, 0.3)",
                    "0 0 40px rgba(183, 110, 121, 0.5)",
                    "0 0 20px rgba(183, 110, 121, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Will you be my
                <br />
                <span className="highlight-name">Valentine, Minnu?</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="question-subtitle"
              >
                Choose wisely... {noAttempts > 3 && "or I'll book that Dubai flight! ✈️"}
              </motion.p>

              <div className="buttons-container">
                <motion.button
                  data-testid="yes-button"
                  onClick={handleYesClick}
                  className="yes-button"
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: [yesButtonSize, yesButtonSize * 1.05, yesButtonSize],
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  whileHover={{ scale: yesButtonSize * 1.1 }}
                  whileTap={{ scale: yesButtonSize * 0.95 }}
                  style={{
                    transform: `scale(${yesButtonSize})`
                  }}
                >
                  <Heart className="button-icon" fill="white" />
                  Yes, of course!
                </motion.button>

                <motion.button
                  data-testid="no-button"
                  ref={noButtonRef}
                  onMouseEnter={moveNoButton}
                  onTouchStart={moveNoButton}
                  className="no-button"
                  initial={{ x: 0, y: 0 }}
                  animate={{ 
                    x: noButtonPosition.x,
                    y: noButtonPosition.y
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  style={{
                    position: noAttempts > 0 ? 'fixed' : 'relative',
                    opacity: Math.max(0.4, 1 - (noAttempts * 0.1))
                  }}
                >
                  {getNoButtonText()}
                </motion.button>
              </div>

              {noAttempts > 2 && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="hint-text"
                >
                  🙄 You can't escape this question!
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}

        {stage === "celebration" && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="stage-container celebration-stage"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 1, bounce: 0.6 }}
              className="celebration-content"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                <Sparkles className="celebration-icon" size={60} color="#D4AF37" />
              </motion.div>

              <motion.h1
                className="celebration-title"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Yaaay! 🎉
              </motion.h1>

              <motion.p
                className="celebration-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                I knew you'd say yes! ❤️
                <br />
                You just made me the happiest person, Minnu! 💕
              </motion.p>

              <motion.div
                className="dubai-card"
                initial={{ y: 50, opacity: 0, rotateX: -90 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{ delay: 1, type: "spring" }}
              >
                <div className="dubai-card-content">
                  <Plane className="plane-icon" size={30} />
                  <h3 className="dubai-title">PS: About Dubai...</h3>
                  <p className="dubai-text">
                    Pack your bags, we're going to Dubai! 🙄
                    <br />
                    <span className="dubai-joke">(Just kidding... unless? 😏)</span>
                  </p>
                  <img 
                    src="https://images.unsplash.com/photo-1697360855756-5e481ecc4ae6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHw0fHxkdWJhaSUyMHNreWxpbmUlMjBuaWdodCUyMHZpZXd8ZW58MHx8fHwxNzcxMDM1NDk0fDA&ixlib=rb-4.1.0&q=85"
                    alt="Dubai Skyline"
                    className="dubai-image"
                  />
                </div>
              </motion.div>

              <motion.div
                className="heart-burst"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 2], opacity: [1, 0.5, 0] }}
                transition={{ duration: 2, delay: 0.5 }}
              >
                💖
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

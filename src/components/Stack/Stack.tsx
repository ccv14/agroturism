import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  isMobile: boolean;
}

function CardRotate({
  children,
  onSendToBack,
  sensitivity,
  isMobile,
}: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(
    y,
    [-100, 100],
    [isMobile ? 15 : 30, isMobile ? -15 : -30]
  );
  const rotateY = useTransform(
    x,
    [-100, 100],
    [isMobile ? -15 : -30, isMobile ? 15 : 30]
  );

  function handleDragEnd(_: never, info: { offset: { x: number; y: number } }) {
    const threshold = isMobile ? sensitivity * 0.6 : sensitivity;
    if (
      Math.abs(info.offset.x) > threshold ||
      Math.abs(info.offset.y) > threshold
    ) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="absolute cursor-grab touch-pan-y"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={isMobile ? 0.3 : 0.5}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  sendToBackOnClick?: boolean;
  cardsData?: { id: number; img: string }[];
  animationConfig?: { stiffness: number; damping: number };
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cardsData = [],
  animationConfig = { stiffness: 300, damping: 25 },
  sendToBackOnClick = false,
}: StackProps) {
  // Fixed dimensions per breakpoint
  const [isMobile, setIsMobile] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 300, height: 400 });
  const [fanSpread, setFanSpread] = useState(1.5);

  const [cards, setCards] = useState(
    cardsData.length
      ? cardsData
      : [
          { id: 5, img: "/images/mancare1.jpg" },
          { id: 6, img: "/images/mancare2.jpg" },
          { id: 7, img: "/images/mancare4.jpg" },
          { id: 8, img: "/images/mancare5.jpg" },
          { id: 1, img: "/images/imagine2.jpg" },
          { id: 2, img: "/images/imagine3.jpg" },
          { id: 3, img: "/images/imagine4.jpg" },
          { id: 4, img: "/images/imagine6.jpg" },
        ]
  );

  useEffect(() => {
    const updateLayout = () => {
      const viewportWidth = window.innerWidth;
      const mobile = viewportWidth <= 767;
      setIsMobile(mobile);

      if (mobile) {
        // For mobile, fixed dimensions (e.g., 300x400)
        setDimensions({ width: 300, height: 400 });
        setFanSpread(0.5);
      } else if (viewportWidth <= 1024) {
        // For tablets, fixed dimensions (e.g., 400x500)
        setDimensions({ width: 450, height: 500 });
        setFanSpread(1);
      } else {
        // For larger screens, fixed dimensions (e.g., 600x800)
        setDimensions({ width: 500, height: 650 });
        setFanSpread(0.8);
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const sendToBack = (id: number) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  return (
    // Container with fixed dimensions that always apply regardless of screen size.
    <div
      className="relative mx-auto mb-8"
      style={{ width: dimensions.width, height: dimensions.height }}
    >
      {cards.map((card, index) => {
        const randomRotate = randomRotation
          ? Math.random() * (isMobile ? 4 : 8) - (isMobile ? 2 : 4)
          : 0;
        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={isMobile ? sensitivity * 0.7 : sensitivity}
            isMobile={isMobile}
          >
            <motion.div
              className="rounded-lg md:rounded-xl overflow-hidden border-2 md:border-[3px] border-white shadow-lg"
              onClick={() => sendToBackOnClick && sendToBack(card.id)}
              animate={{
                rotateZ: (cards.length - index - 1) * fanSpread + randomRotate,
                scale: 1, // fixed scale ensures all cards have the same dimensions
                transformOrigin: "90% 90%",
              }}
              initial={false}
              transition={{
                type: "spring",
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
              style={{ width: dimensions.width, height: dimensions.height }}
            >
              <img
                src={card.img}
                alt={`Card ${card.id}`}
                className="w-full h-full object-cover pointer-events-none"
                loading={index > 2 ? "lazy" : "eager"}
                sizes="(max-width: 768px) 300px, 600px"
              />
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Explore", "Interact", "Experience"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-0 lg:py-0 items-center justify-center flex-col">
          
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-spektr-50 bg-gradient-to-r from-[#00ffaa] to-[#00ffdd] bg-clip-text text-transparent">Welcome to AI Verse</span>
              <span
                className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1"
                // The radial gradient creates the "pool of light" on the background
                /*style={{
                  backgroundImage: 'radial-gradient(ellipse 40% 150% at 50% 100%, rgba(0, 255, 170, 0.4) 0%, transparent 70%)'
                  // '50% 80%' positions the light source slightly below the center of the text area
                  // 'rgba(220,220,240,0.20)' is a very light, slightly cool white for the glow
                  // 'transparent 70%' means the light fades out by 70% of the gradient's radius
                }}*/
              >
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                key={index}
                className="absolute font-semibold"
                initial={{ opacity: 0, y: "-100" }}
                transition={{ type: "spring", stiffness: 50 }}
                animate={
                  titleNumber === index
                    ? {
                        y: 0,
                        opacity: 1,
                      }
                    : {
                        y: titleNumber > index ? -150 : 150,
                        opacity: 0,
                      }
                }
              >
                {title}
              </motion.span>

                ))}
              </span>
            </h1>

            
          </div>
          </div>
      </div>
    </div>
  );
}

export { Hero };
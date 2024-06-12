import React, { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export const RevealX = ({ children, scale = 1, direction = "right" }) => {
  const targetRef = useRef(null);

  const inView = useInView(targetRef, { once: true });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView]);

  return (
    <div ref={targetRef} className={"overflow-hidden"}>
      <motion.div
        variants={{
          hidden: { opacity: 0, x: direction === "left" ? 300 * scale : -300 * scale },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const RevealY = ({ children, scale = 1, direction = "up" }) => {
  const targetRef = useRef(null);

  const inView = useInView(targetRef, { once: true });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView]);

  return (
    <div ref={targetRef} className={" overflow-hidden "}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: direction === "down" ? -300 * scale : 300 * scale },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.5, delay: 0 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

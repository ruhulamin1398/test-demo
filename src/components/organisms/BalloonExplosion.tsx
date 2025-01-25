"use client";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";
import styled from "@emotion/styled";
import useThemeToggle from "@/app/hooks/useTheme";

const StyledParticles = styled(Particles)({
  WebkitTransform: "translate3d(0, 0, 0)", // use camelCase for vendor prefixes
  transform: "translate3d(0, 0, 0)",
  WebkitBackfaceVisibility: "hidden", // use camelCase for vendor prefixes
  backfaceVisibility: "hidden",
  WebkitPerspective: 1000, // use camelCase for vendor prefixes
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  position: "absolute",
  zIndex: 0,
  overflow: "hidden",
});

const BalloonExplosion = () => {
  const [init, setInit] = useState(false);
  const { mode } = useThemeToggle();

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFireworksPreset(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "rgba(255, 255, 255, 1)", // Set your background color here (e.g., dark background)
        },
      },
      fullScreen: {
        enable: true,
        zIndex: 1, // Ensures particles cover the full screen
      },
      particles: {
        shape: {
          type: "square",
        },
      },
      preset: "fireworks",
    }),
    []
  );

  if (init) {
    return (
      <StyledParticles
        id="tsparticles-header"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
};

export default BalloonExplosion;

import { CinematicShot } from "../components/CinematicShot";
export const Scene2 = () => (
  <CinematicShot
    image="images/vincent-cyberpunk-2.jpg"
    zoomFrom={1.0}
    zoomTo={1.18}
    panY={-15}
    caption="A figure on the horizon"
    timecode="00:03:21"
    durationInFrames={270}
  />
);

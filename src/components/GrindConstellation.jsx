import { ConstellationField } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export default function GrindConstellation() {
  return (
    <div className="shader-frame" aria-hidden="true">
      <ConstellationField
        variant="topo-field"
        mode="dark"
        speed={1}
        size={1}
        length={1}
        density={1}
        opacity={1}
        hue={0}
        saturation={1}
        brightness={1}
      />
    </div>
  );
}
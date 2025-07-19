import { useRef, useEffect, useState } from "react";

interface ColorBoxProps {
  bgClass: string;
  textClass: string;
  label: string;
  rounded?: string;
  height?: string;
  width?: string;
}

function ColorBox({
  bgClass,
  textClass,
  label,
  rounded = "",
  height = "h-50",
  width = "w-25",
}: ColorBoxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hex, setHex] = useState("");

  useEffect(() => {
    if (ref.current) {
      const color = getComputedStyle(ref.current).backgroundColor;
      const rgb = color.match(/\d+/g);
      if (rgb) {
        setHex(
          "#" +
            rgb
              .slice(0, 3)
              .map((x) => ("0" + parseInt(x).toString(16)).slice(-2))
              .join("")
        );
      }
    }
  }, [bgClass]);

  return (
    <div
      ref={ref}
      className={`${height} ${width} ${bgClass} ${rounded} group flex items-end justify-start relative`}
    >
      <span className={`hidden group-hover:block absolute px-1.5 ${bgClass} brightness-75 ${textClass}`}>
        {label}
        <br />
        {hex}
      </span>
    </div>
  );
}

export default ColorBox;
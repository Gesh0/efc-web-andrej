/**
 * EFC logo mark — six angular paths forming a stylized "EFC" monogram.
 * viewBox 0 0 1024 1024. Always red in the design; `color` prop kept for reuse.
 */
type LogoProps = {
  size?: number;
  color?: string;
  className?: string;
};

export default function Logo({
  size = 26,
  color = "#DC2626",
  className,
}: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: "block", flex: "none" }}
      aria-hidden="true"
    >
      <path d="M234.058 461.334L351.087 461.334L643.66 968.079L526.631 968.079L234.058 461.334Z" fill={color} />
      <path d="M0 461.334L117.029 461.334L409.602 968.079L292.573 968.079L0 461.334Z" fill={color} />
      <path d="M643.655 258.621L585.14 359.971L0 359.974L58.5145 258.624L643.655 258.621Z" fill={color} />
      <path d="M760.684 55.921L702.169 157.271L117.029 157.274L175.544 55.9239L760.684 55.921Z" fill={color} />
      <path d="M614.403 714.692L555.889 613.342L848.456 106.594L906.971 207.944L614.403 714.692Z" fill={color} />
      <path d="M731.432 917.392L672.918 816.042L965.485 309.294L1024 410.644L731.432 917.392Z" fill={color} />
    </svg>
  );
}

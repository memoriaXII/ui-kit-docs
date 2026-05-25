import Image from "next/image";

export interface CountryFlagProps {
  imageUrl: string;
  className?: string;
  size?: number;
}

export const CountryFlag = ({
  imageUrl,
  className = "",
  size = 40,
}: CountryFlagProps) => {
  return (
    <div
      className={`relative rounded-full overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={imageUrl}
        alt=""
        fill
        className="object-cover"
        style={{ objectPosition: "center" }}
      />
    </div>
  );
};

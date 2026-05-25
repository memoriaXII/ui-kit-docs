import { Body2, TouchCell } from "@appboxo/ui-kit";
import type { EPass } from "@boxo/api/lounge";
import { formatBookingDateTime, getAirportInfo } from "@/lib/quote-utils";

interface PassCardProps {
  pass: EPass;
  onClick?: () => void;
}

const PassCard = ({ pass, onClick }: PassCardProps) => {
  const { quote } = pass;
  const dateTimeString = formatBookingDateTime(quote);
  const airportInfo = getAirportInfo(quote);

  return (
    <TouchCell
      className="py-[16px] px-[16px] bg-fill-1 rounded-[16px] shadow-[0_5px_20px_0_rgba(0,0,0,0.05)]"
      activeClass="bg-fill-2"
      icon={
        <img
          src={airportInfo.flagUrl}
          alt={airportInfo.name}
          width={40}
          height={40}
          className="rounded-full object-cover min-w-[40px] min-h-[40px]"
        />
      }
      label={
        <div className="flex flex-col gap-[4px]">
          <Body2 weight="semibold">{airportInfo.name}</Body2>
          <Body2 className="text-text-3">{dateTimeString}</Body2>
        </div>
      }
      bordered={false}
      onClick={onClick}
      showArrow={false}
    />
  );
};

interface PassesListProps {
  passes: EPass[];
  onPassClick?: (pass: EPass) => void;
}

export const PassesList = ({ passes, onPassClick }: PassesListProps) => {
  return (
    <div className="flex flex-col gap-[8px]">
      {passes.map((pass) => (
        <PassCard
          key={pass.id}
          pass={pass}
          onClick={() => onPassClick?.(pass)}
        />
      ))}
    </div>
  );
};

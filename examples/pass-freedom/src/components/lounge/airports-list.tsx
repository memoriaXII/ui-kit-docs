import { Flex, Title3 } from "@appboxo/ui-kit";
import { AirportListItem } from "./airport-list-item";
import type { Hub } from "@boxo/api/lounge";
import type { ReactNode } from "react";

export interface AirportsListProps {
  title?: string;
  airports?: Array<Hub>;
  onAirportSelect?: (airportId: string) => void;
  headerContent?: ReactNode;
}

export const AirportsList = ({
  title,
  airports,
  onAirportSelect,
  headerContent,
}: AirportsListProps) => {
  if (!airports?.length) {
    return null;
  }

  return (
    <Flex gap={12}>
      {title && (
        <Title3 weight="semibold" className="text-text-5">
          {title}
        </Title3>
      )}

      {headerContent}

      <div className="bg-fill-1 rounded-[16px] shadow-[0_5px_20px_0_rgba(0,0,0,0.05)] overflow-hidden">
        {airports.map((airport, index) => (
          <AirportListItem
            key={airport.id}
            airport={airport}
            href={{
              pathname: `/airports/${airport.id}`,
              query: { hubId: airport.id, name: airport.title },
            }}
            onClick={() => onAirportSelect?.(airport.id)}
            isLast={index === airports.length - 1}
          />
        ))}
      </div>
    </Flex>
  );
};

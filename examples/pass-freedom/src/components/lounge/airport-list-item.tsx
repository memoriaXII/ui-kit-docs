import { TouchCell, Flex, Body2 } from "@appboxo/ui-kit";
import { cls } from "@arco-design/mobile-utils";
import Link from "next/link";
import { CountryFlag } from "./country-flag";
import type { Hub } from "@boxo/api/lounge";
import { Url } from "next/dist/shared/lib/router/router";

export interface AirportListItemProps {
  airport: Hub;
  href?: Url;
  onClick?: () => void;
  isLast?: boolean;
}

export const AirportListItem = ({
  airport,
  href,
  onClick,
  isLast,
}: AirportListItemProps) => {
  const content = (
    <TouchCell
      className={cls("py-[16px] px-[16px] relative", {
        "after:content-[''] after:absolute after:left-[16px] after:right-[16px] after:bottom-0 after:h-[0.5px] after:bg-line-1":
          !isLast,
      })}
      activeClass="bg-fill-2"
      label={
        <Flex vertical={false} gap={12} align="center">
          <CountryFlag imageUrl={airport.country.image || ""} />
          <Flex flex={1} gap={4} align="flex-start">
            <Body2 weight="semibold" className="text-text-5">
              {airport.title} ({airport.iata})
            </Body2>
            <Body2 className="text-text-3">
              {airport.city}, {airport.country.title}
            </Body2>
          </Flex>
        </Flex>
      }
      showArrow={false}
      bordered={false}
      onClick={href ? undefined : onClick}
    />
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return content;
};

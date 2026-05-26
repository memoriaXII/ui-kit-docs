import { cls } from "@arco-design/mobile-utils";
import { Flex, Skeleton, Title3 } from "@appboxo/ui-kit";

export type LoungeSkeletonVariant = "grouped" | "separated";

export interface LoungeSkeletonProps {
  className?: string;
  rows?: number;
  /**
   * - `"grouped"` (default): single surface card (`fill-1`) with thin dividers between rows.
   *   Used on list pages like `/airports/search`.
   * - `"separated"`: each row is its own surface card with shadow, separated by
   *   vertical gap. Used on `/passes` to mirror the `PassCard` layout.
   */
  variant?: LoungeSkeletonVariant;
  /** Optional heading rendered above the rows (e.g. "Active passes"). */
  title?: string;
}

const CARD_SHADOW = "0 5px 20px 0 rgba(0, 0, 0, 0.05)";

const SkeletonRow = () => (
  <div className="flex items-center gap-[12px]">
    <Skeleton width={44} height={44} circle />
    <Skeleton width={140} height={16} />
  </div>
);

/**
 * Loading skeleton that previews the airport / pass list rows
 * (44×44 avatar + single text line), matching the `PassCard` and
 * `AirportListItem` layout used after data loads.
 *
 * Horizontal positioning is left to the caller — pages that use
 * `noPaddingX` on the Layout (e.g. `/passes`) should pass
 * `className="px-[16px]"` to align with the rest of the content.
 */
export const LoungeSkeleton = ({
  className,
  rows = 3,
  variant = "grouped",
  title,
}: LoungeSkeletonProps) => {
  if (variant === "separated") {
    return (
      <Flex gap={16} className={className}>
        {title && (
          <Title3 weight="semibold" className="text-text-5">
            {title}
          </Title3>
        )}
        <Flex gap={8}>
          {Array.from({ length: rows }).map((_, index) => (
            <div
              key={index}
              className="bg-fill-1 rounded-[16px] px-[16px] py-[18px]"
              style={{ boxShadow: CARD_SHADOW }}
            >
              <SkeletonRow />
            </div>
          ))}
        </Flex>
      </Flex>
    );
  }

  return (
    <div className={className}>
      {title && (
        <Title3 weight="semibold" className="text-text-5 mb-[16px] block">
          {title}
        </Title3>
      )}
      <div
        className="bg-fill-1 rounded-[16px] px-[16px]"
        style={{ boxShadow: CARD_SHADOW }}
      >
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className={cls(
              "py-[18px]",
              index !== 0 && "border-t border-fill-2",
            )}
          >
            <SkeletonRow />
          </div>
        ))}
      </div>
    </div>
  );
};

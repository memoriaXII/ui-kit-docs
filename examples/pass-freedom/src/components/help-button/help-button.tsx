import Link from "next/link";

import HelpIcon from "@/assets/icons/help.svg";

export const HelpButton = () => (
  <Link href="/help">
    <HelpIcon />
  </Link>
);

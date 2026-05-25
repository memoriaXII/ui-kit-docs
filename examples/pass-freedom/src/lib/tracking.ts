import { getDeviceInfo, safeWindow } from "@boxo/esim-util";
import { isAndroid, isIOS } from "react-device-detect";

const VISITS_KEY = "pass_freedom_visits";

export function getNumberOfVisits(): number {
  if (!safeWindow) return 1;
  const visits = safeWindow.localStorage.getItem(VISITS_KEY);
  if (!visits) {
    safeWindow.localStorage.setItem(VISITS_KEY, "1");
    return 1;
  }
  const count = parseInt(visits, 10) + 1;
  safeWindow.localStorage.setItem(VISITS_KEY, count.toString());
  return count;
}

export async function getTrackingProps() {
  try {
    const deviceInfo = await getDeviceInfo();
    const device = deviceInfo?.model || "unknown";
    const OS =
      deviceInfo?.platform ||
      (isAndroid ? "Android" : isIOS ? "iOS" : "unknown");
    const number_of_visits = getNumberOfVisits();

    return {
      device,
      OS,
      number_of_visits,
    };
  } catch (error) {
    return {
      device: "unknown",
      OS: isAndroid ? "Android" : isIOS ? "iOS" : "unknown",
      number_of_visits: getNumberOfVisits(),
    };
  }
}

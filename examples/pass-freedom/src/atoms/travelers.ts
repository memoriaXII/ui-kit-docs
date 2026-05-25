import { atomWithReset } from "jotai/utils";

interface Passenger {
  first_name: string;
  last_name: string;
}

interface TravelersDetails {
  passengers: Passenger[];
}

export const travelersDetailsAtom = atomWithReset<TravelersDetails>({
  passengers: [],
});

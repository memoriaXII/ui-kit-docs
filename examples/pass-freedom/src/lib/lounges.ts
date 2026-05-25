import { Lounge, LoungeAmenity } from "@boxo/api/lounge";

export interface LoungeDetail extends Lounge {
  imageUrl: string;
  airport: string;
  airportCode: string;
  destination: string;
  amenities: LoungeAmenity[];
}

import { atomWithReset } from "jotai/utils";

interface AdditionalDetails {
  transport_number: string;
  email: string;
  dial_code: string;
  mobile_number: string;
}

export const additionalDetailsAtom = atomWithReset<AdditionalDetails>({
  transport_number: "",
  email: "",
  dial_code: "+7",
  mobile_number: "",
});

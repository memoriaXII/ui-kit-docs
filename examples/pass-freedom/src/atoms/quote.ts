import { atomWithReset } from "jotai/utils";
import { Quote } from "@boxo/api/lounge";

export const quoteAtom = atomWithReset<Quote | null>(null);

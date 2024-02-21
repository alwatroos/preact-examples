import { signal } from "@preact/signals";
import { generateRandomString } from "../utils/generateRandomString";

export const firstSignal = signal("first signal " + generateRandomString(5));
export const secondSignal = signal("second signal " + generateRandomString(5));

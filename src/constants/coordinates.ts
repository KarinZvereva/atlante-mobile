import { ASPECT_RATIO } from "./display";

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export const COORDINATES_DELTA = { LATITUDE_DELTA, LONGITUDE_DELTA };
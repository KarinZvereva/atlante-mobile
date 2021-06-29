import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
export const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 15;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export const COORDINATES_DELTA = {LATITUDE_DELTA, LONGITUDE_DELTA};

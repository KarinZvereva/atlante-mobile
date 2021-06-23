/**
 * Function to extract data by arrow function in a safe way to avoid exceptions
 * @param  {} fetchDataFunction function that return data
 */
export const safeFetchDataFactory = <T>() => (fetchDataFunction: () => T): T | undefined => {
  try {
    return fetchDataFunction();
  } catch ({ message }) {
    console.warn(`FetchField Error: ${message}`);
    return undefined;
  }
};

/**
 * Create a new object with new proprierties name that ends
 * with a given string
 * @param objToRemap the object to remap
 * @param toAppend the string to append at the end of each obj prop
 * @returns new object with the remapped props and the same value of the original
 */
export const RemapObjKey = (objToRemap: any, toAppend: string): any => {
  const result: any = {};
  for (const k in objToRemap) {
    if(objToRemap.hasOwnProperty(k))
      result[`${k}${toAppend}`] = objToRemap[k];
  }
  return result;
}
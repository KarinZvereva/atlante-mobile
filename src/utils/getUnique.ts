
/** Remove duplicate on given key from an array of object */
export function getUnique(arr: Array<any>, comp: any) {
  return arr
    .map((e: any) => e[comp]) // store the comparison  values in array
    .map((e: any, i: any, final: any) => final.indexOf(e) === i && i) // store the indexes of the unique objects
    .filter((e: any) => arr[e]) // eliminate the false indexes 
    .map((e: any) => arr[e]); // return unique objects
}

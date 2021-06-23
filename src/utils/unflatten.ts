/** 
 * Convert the input flat array in a tree structure
 * @param itemsArray: array of object, every element should have an id field and field named as keyParent
 * @param keyParent: the field name which contain reference to the id of parent element
 * @param keyChildren: the field name which contains reference to children leaf in the output tree structure
 * @returns a tree structure from the original array
 * */
export const unflatten = (itemsArray: any[], keyParent: string = 'parentId', keyChildren: string = 'children') => {
  const tree: any = [];
  const mappedArr: any = {};
  let arrElem: any;
  let mappedElem: any;
  
  // First map the nodes of the array to an object -> create a hash table.
  for (let i = 0, len = itemsArray.length; i < len; i++) {
    arrElem = itemsArray[i];
    mappedArr[arrElem.id] = arrElem;
    mappedArr[arrElem.id][keyChildren] = [];
  }

  for (const id in mappedArr) {
    if (mappedArr.hasOwnProperty(id)) {
      mappedElem = mappedArr[id];
      if (mappedElem[keyParent]) {
        // If the element is not at the root level, add it to its parent array of children.
        mappedArr[mappedElem[keyParent]][keyChildren].push(mappedElem);
      } else {
        // If the element is at the root level, add it to first level elements array.
        tree.push(mappedElem);
      }
    }
  }
  
  return tree;
};

export interface cleanObjectOptions {
  clearNull: boolean;
  clearUndefined: boolean;
  clearEmptyString: boolean;
  clearEmptyObj: boolean;
}

export function cleanObject(
  obj: any,
  options: cleanObjectOptions = { clearNull: true, clearUndefined: true, clearEmptyObj: false, clearEmptyString: true }
) {
  const { clearNull, clearEmptyObj, clearUndefined, clearEmptyString } = options;
  const propNames = Object.getOwnPropertyNames(obj);
  for (var i = 0; i < propNames.length; i++) {
    const propName = propNames[i];
    if (
      (clearNull && obj[propName] === null) ||
      (clearUndefined && obj[propName] === undefined) ||
      (clearEmptyString && obj[propName] === "") ||
      (clearEmptyObj && Object.keys(obj[propName]).length === 0)
    ) {
      delete obj[propName];
    } else {
      const innerObj = obj[propName];
      if (typeof innerObj === "object") cleanObject(innerObj, options);
    }
  }
}

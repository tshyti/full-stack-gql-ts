/**
 * This function is used for transforming an array of 
 * objects into an object that uses a key taken from the object
 * as its own key and points it to the object itself.
 * The key identifier of the object is number
 * @param values Array of objects
 * @param keyPropery The key property of the object that we want to map
 * @returns A transformed object
 */
export function arrayOfObjectsToObjectNumber<
  TValue extends object,
  TKey extends keyof TValue
>(values: TValue[], keyPropery: TKey) {
  var object: { [key: number]: TValue } = {};

  for (const val of values) {
    const keyValue = val[keyPropery];

    if (typeof keyValue === "number") {
      object[keyValue] = val;
    }
  }
  return object;
}

/**
 * This function is used for transforming an array of 
 * objects into an object that uses a key taken from the object
 * as its own key and points it to the object itself.
 * The key identifier of the object is string
 * @param values Array of objects
 * @param keyPropery The key property of the object that we want to map
 * @returns A transformed object
 */
export function arrayOfObjectsToObjectString<
  TValue extends object,
  TKey extends keyof TValue
>(values: TValue[], keyPropery: TKey) {
  var object: { [key: string]: TValue } = {};

  for (const val of values) {
    const keyValue = val[keyPropery];

    if (typeof keyValue === "string") {
      object[keyValue] = val;
    }
  }
  return object;
}

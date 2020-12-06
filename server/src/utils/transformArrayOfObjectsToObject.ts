export default function transformArrayOfObjectsToObject<
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

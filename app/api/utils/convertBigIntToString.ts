export default function convertBigIntToString(obj: any): any {
  if (typeof obj === 'bigint') {
      return obj.toString();
  } else if (Array.isArray(obj)) {
      return obj.map(convertBigIntToString);
  } else if (typeof obj === 'object' && obj !== null) {
      const newObj: any = {};
      for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
              newObj[key] = convertBigIntToString(obj[key]);
          }
      }
      return newObj;
  }
  return obj;
}
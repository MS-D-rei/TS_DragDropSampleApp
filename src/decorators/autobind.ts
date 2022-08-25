// namespace App {
// Decorator AutoBind
export function AutoBind(
  _: any,
  _2: string | Symbol,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this); // 'this' indicates the class attached
      return boundFn;
    },
  };
  return adjustedDescriptor;
}
// }

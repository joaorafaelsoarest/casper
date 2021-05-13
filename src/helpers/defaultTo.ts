export default function<T,L>(value: T | null | undefined, defaultValue: L)  {
  return value ? value : defaultValue;
}

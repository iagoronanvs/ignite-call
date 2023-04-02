export function converStringToCapitalize(value: string) {
  return value.substring(0, 1).toUpperCase().concat(value.substring(1))
}

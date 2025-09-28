export function object2Json(input: string) {
  const object = eval(`(${input})`)
  return JSON.stringify(object, null, 2)
}

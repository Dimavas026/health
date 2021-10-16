export const stringifyObject = (object: Record<string, string>): string => {
  const parameters = ''
  Object.keys(object).forEach((key) => {
    parameters.concat(`${key}=${object[key]}`)
  })
  return parameters
}

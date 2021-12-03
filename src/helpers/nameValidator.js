export function nameValidator(name,field) {
  if (!name) return `${field} can't be empty.`
  return ''
}

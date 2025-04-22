export function sizeofByte (str: string, charset = 'utf-8') {
  let total = 0
  let charCode = 0

  charset = charset.toLowerCase()

  if (charset === 'utf-8' || charset === 'utf8') {
    for (let i = 0, len = str.length; i < len; i++) {
      charCode = str.codePointAt(i) as number;

      if (charCode <= 0x007f) {
        total += 1
      } else if (charCode <= 0x07ff) {
        total += 2
      } else if (charCode <= 0xffff) {
        total += 3
      } else {
        total += 4
        i++
      }
    }
  } else if (charset === 'utf-16' || charset === 'utf16') {
    for (let i = 0, len = str.length; i < len; i++) {
      charCode = str.codePointAt(i) as number;

      if (charCode <= 0xffff) {
        total += 2
      } else {
        total += 4
        i++
      }
    }
  } else {
    total = str.replace(/[^\x00-\xff]/g, 'aa').length
  }

  return JSON.stringify({
    chars: str.length,
    bytes:total
  }, null, 2)
}
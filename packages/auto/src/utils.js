import setCookie from 'set-cookie-parser'

const { splitCookiesString, parse } = setCookie

export const parseCookie = (headers) => {
  return parse(
    splitCookiesString(
      headers['set-cookie']
    )
  )
}

export const qs = (o) => {
  const params = new URLSearchParams(o)
  return params.toString()
}
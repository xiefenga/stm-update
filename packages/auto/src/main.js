import { request } from 'undici'
import { parseCookie, qs } from './utils.js'

const token = '3bdea882c780467b92ae5f90591f7bd35eb0c551fdea4e35be84530ec6b59bf2'

const authTokenURL = 'https://jsstm.jszwfw.gov.cn/jkm/2/userAuth_token'

const queryInfoURL = 'https://jsstm.jszwfw.gov.cn/jkm/2/queryUserInfo'

const updateInfoURL = 'https://jsstm.jszwfw.gov.cn/jkm/2/saveInfo'

const authToken = async (token) => {

  const {
    statusCode,
    headers,
    body
  } = await request(authTokenURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `token=${token}`
  })

  const data = await body.json()

  const cookies = parseCookie(headers)

  return { cookies, data }
}

const queryInfo = async (basicParams) => {

  // const basicBody = { name, sex, abc, mAbc }

  const extendParams = {
    idType: 1,
    fromFlag: 1,
    alipayUid: false,
  }

  const params = qs(Object.assign({}, basicParams, extendParams))

  const {
    statusCode,
    headers,
    body
  } = await request(queryInfoURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  })

  const data = await body.json()

  const cookies = parseCookie(headers)

  return { cookies, data }
}

const updateInfo = async (cookies, basicParams) => {

  const extendParams = {
    source: 'other',
    alipayUid: '',
    realtimeLocation: '',
    tokenMiss: '',
    leveldata: 'green'
  }

  const params = qs(Object.assign({}, basicParams, extendParams))

  const {
    statusCode,
    headers,
    body
  } = await request(updateInfoURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': cookies.reduce((cookies, cookie) => `${cookies}; ${cookie.name}=${cookie.value}`, '').slice(2)
    },
    body: params
  })

  const data = await body.json()

  return { data }
}

const handleQueryParams = (tokenData) => {
  const { userdetail } = tokenData.res
  const { name, sex, abc, mAbc } = userdetail
  return { name, sex, abc, mAbc }
}

const handleUpdateParams = (infoData, sex) => {
  const {
    info,
    remainDays,
    idType,
    abc,
    mAbc,
    name
  } = infoData.res

  const {
    id,
    modified,
    phone: mobile,
    current_location: currentLocation,
    current_address: currentAddress,
    arrival_location: arrivalLocation,
    current_location_code: currentLocationCode,
    arrival_location_code: arrivalLocationCode,
    r1data,
    r2data,
    r3data,
    r4data,
    r5data,
    r6data,
    r7data
  } = info

  return {
    name,
    sex,
    mobile,
    mAbc,
    idType,

    currentLocation,
    currentAddress,
    arrivalLocation,
    currentLocationCode,
    arrivalLocationCode,
    r1data,
    r2data,
    r3data,
    r4data,
    r5data,
    r6data,
    r7data,
    abc,
    id,
    modified: modified + 1,
  }
}

const autoUpdateInfo = (token) => {

  try {
    const { data: tokenData } = await authToken(token)

    const queryParams = handleQueryParams(tokenData)

    const { cookies, data: infoData } = await queryInfo(queryParams)

    const params = handleUpdateParams(infoData, queryParams.sex)

    updateInfo(cookies, params)

  } catch (error) {

  }

}

export default autoUpdateInfo










import { axios } from '../../index'
export async function queryTwitters(data: any = { limit: 10, pageOffset: 1 }) {
  const twitterList: any = await axios.post('/twitter/queryTwitters', data)
  return twitterList
}

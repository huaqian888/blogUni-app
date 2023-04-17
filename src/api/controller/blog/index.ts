import { axios } from '../../index'
export async function listBlog(data?: any) {
  const blogList: any = await axios.post('/blog/listBlog', data)
  return blogList
}
export async function queryBlogDetails(data?: any) {
  const blogDetail: any = await axios.post('/blog/queryBlogDetails', data)
  return blogDetail
}

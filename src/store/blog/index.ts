import type { BlogDTO } from '@/api/dto/blog'
import { defineStore } from 'pinia'

interface BlogStore {
  blogList: Array<BlogDTO.blogInfo>
  listParam: {
    limit: number
    pageOffset: number
    blogTitle: string
  }
  blogCount: number
}
export const useBlogStore = defineStore('blogStore', {
  state: (): BlogStore => {
    return {
      blogList: [],
      listParam: {
        limit: 5,
        pageOffset: 1,
        blogTitle: '',
      },
      blogCount: 0,
    }
  },
  actions: {
    setBlogList(blogList: any, init: boolean = false) {
      if (init) {
        this.blogList.length = 0
      }
      this.blogList.push(...blogList)
    },
    setPageOffset(val: number) {
      this.listParam.pageOffset = val
    },
    setBlogTitle(val: string) {
      this.listParam.blogTitle = val
    },
    setBlogCount(val: number) {
      this.blogCount = val
    },
  },
  getters: {
    getBlogList(state: BlogStore) {
      return state.blogList
    },
    getPageOffset(state: BlogStore) {
      return state.listParam.pageOffset
    },
    getBlogTitle(state: BlogStore) {
      return state.listParam.blogTitle
    },
    getListParam(state: BlogStore) {
      return state.listParam
    },
    getBlogCount(state: BlogStore) {
      return state.blogCount
    },
  },
})

export namespace BlogDTO {
  export interface blogInfo {
    blogId: number
    blogTitle: string
    blogSummary: string
    blogContent: string
    blogCover: string
    blogTag: string
    blogReleaseDate: string
    blogCommentCount: number
    blogViewCount: number
    blogFeatured: boolean
  }
}

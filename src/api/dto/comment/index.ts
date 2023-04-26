import type { pagination } from '@/common/types'

export namespace CommentDTO {
  export interface comment {
    blogId: number
    commentFatherId?: number
    quotedCommentId?: number
    commentatorId: number
    commentContent: string
    replierId?: number
    commentDate: string
  }

  export interface listComment extends pagination {
    blogId: number
  }
}

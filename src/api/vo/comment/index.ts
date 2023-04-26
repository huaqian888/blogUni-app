import type { PersonalVO } from '@/api/vo'

export namespace CommentVO {
  export interface commentInfo {
    blogId: number

    commentId: number

    commentator: PersonalVO.userInfo

    commentContent: string

    commentDate: string

    children: commentInfo[]

    commentFatherId?: number

    quotedCommentId?: number

    replier?: PersonalVO.userInfo
  }
}

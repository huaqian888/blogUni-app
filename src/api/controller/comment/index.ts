import { axios } from '@/api'
import type { CommentDTO } from '@/api/dto'

export async function releaseComment(param: CommentDTO.comment) {
  await axios.post('/comment/releaseComment', param)
  return
}

export async function queryComments(param: CommentDTO.listComment) {
  const commentList = await axios.post('/comment/queryComments', param)
  return commentList
}

export async function queryCommentById(param: number) {
  const comment = await axios.post('/comment/queryCommentById', {
    commentId: param,
  })
  return comment
}

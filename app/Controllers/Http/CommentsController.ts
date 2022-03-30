import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Article from 'App/Models/Article'
import Comment from 'App/Models/Comment'
import CreateCommentValidator from 'App/Validators/CreateCommentValidator'

import { getComment, getComments } from '../Mappers/CommentMapper'

export default class CommentsController {
  public async index({ request, response, auth }: HttpContextContract) {
    const slug = request.param('slug')
    const user = auth.user!

    const article = await Article.findByOrFail('slug', slug)
    const comments = await article.related('comments').query()

    return response.ok(await getComments(comments, user))
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const { comment: commentPayload } = await request.validate(CreateCommentValidator)
    const slug = request.param('slug')
    const user = auth.user!

    const article = await Article.findByOrFail('slug', slug)
    const comment = await article
      .related('comments')
      .create({ ...commentPayload, authorId: user.id })

    return response.created({ comment: await getComment(comment, user) })
  }
}

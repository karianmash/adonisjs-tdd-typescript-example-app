import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import {
  BaseModel,
  belongsTo,
  BelongsTo,
  column,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import Tag from './Tag'
import User from './User'

export default class Article extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public title: string

  @column()
  @slugify({
    strategy: 'simple',
    fields: ['title'],
  })
  public slug: string

  @column()
  public description: string

  @column()
  public body: string

  @manyToMany(() => Tag, {
    pivotTable: 'articles_tags',
    relatedKey: 'name',
  })
  public tagList: ManyToMany<typeof Tag>

  @column({ columnName: 'author', serializeAs: 'author' })
  public authorId: number

  @belongsTo(() => User, {
    foreignKey: 'authorId',
  })
  public author: BelongsTo<typeof User>

  @manyToMany(() => User, {
    pivotTable: 'favorites',
  })
  public favorites: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true, serializeAs: 'createdAt' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt' })
  public updatedAt: DateTime
}

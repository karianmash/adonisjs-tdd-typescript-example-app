import Factory from '@ioc:Adonis/Lucid/Factory'
import Article from 'App/Models/Article'
import Tag from 'App/Models/Tag'
import User from 'App/Models/User'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: '123456',
    bio: faker.lorem.paragraph(),
    image: faker.image.imageUrl(),
  }
})
  .relation('followers', () => UserFactory)
  .build()

export const ArticleFactory = Factory.define(Article, ({ faker }) => {
  return {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    body: faker.lorem.paragraphs(),
  }
})
  .relation('tagList', () => TagsFactory)
  .relation('author', () => UserFactory)
  .relation('favorites', () => UserFactory)
  .build()

export const TagsFactory = Factory.define(Tag, ({ faker }) => {
  return {
    name: faker.lorem.slug(),
  }
}).build()

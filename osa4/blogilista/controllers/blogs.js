const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
      .catch(error => {
          console.log(error)
      })
  })
  
blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
          console.log(result)
        response.status(201).json(result)
      })
      .catch(error => {
          console.log(error)
      })
})

module.exports = blogsRouter
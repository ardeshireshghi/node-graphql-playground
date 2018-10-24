const express = require('express');
const expressGraphql = require('express-graphql');
const CourseRepository = require('./repositories/CourseRepository');

const app = express();

// GraphQL schema
const schema = require('./graphql/schema');

const PORT = process.env.PORT || 4000;

const courseRepository = CourseRepository.create();
const rootValue = {
  updateCourseTopic: courseRepository.updateTopic.bind(courseRepository),
  course: courseRepository.getById.bind(courseRepository),
  courses: courseRepository.findWhere.bind(courseRepository)
};

app.use('/graphql', expressGraphql({
  schema,
  rootValue,
  graphiql: true
}));

exports.app = app;
exports.PORT = PORT;

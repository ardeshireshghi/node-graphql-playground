const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String, author: String): [Course]
    },
    type Mutation {
        updateCourseTopic(id: Int!, topic: String!): Course
    }
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

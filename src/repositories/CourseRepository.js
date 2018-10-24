const { Course } = require('../models/Course');
const { coursesData } = require('../data/courses');

const createCourseCollection = () => coursesData.map(props => new Course(props));

class CourseRepository {
  constructor(courseCollection) {
    this._collection = courseCollection;
  }

  getById({ id }) {
    return this._collection.find(course => course.id === id);
  }

  findWhere(attributes = {}) {
    if (Object.keys(attributes).length === 0) {
      return this._collection;
    }

    return this._collection
      .filter(course => Object.keys(attributes)
        .every(field => (field in course && attributes[field] === course[field])));
  }

  updateTopic({ id, topic }) {
    const courseWithId = this.findWhere({ id });

    if (courseWithId.length) {
      const courseWithNewTopic = new Course({
        ...courseWithId[0],
        topic
      });

      this._collection = this._collection
        .map(course => (course.id === id ? courseWithNewTopic : course));
      return courseWithNewTopic;
    }

    return null;
  }

  static create(collection = createCourseCollection()) {
    return new CourseRepository(collection);
  }
}

module.exports = CourseRepository;

import http from '../utils/api';

class CourseService {
    getAll() {
        return http.get('/courses');
    }

    get(id) {
        return http.get(`/courses/${id}`);
    }

    getByTeacherId(id) {
        return http.get(`/courses/teacher/${id}`);
    }

    create(data) {
        return http.post('/courses', data);
    }

    update(id, data) {
        return http.put(`/courses/${id}`, data);
    }

    delete(id) {
        return http.delete(`/courses/${id}`);
    }
}

export default CourseService;
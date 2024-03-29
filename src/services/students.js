import http from '../utils/api';

class StudentService {
    getAll() {
        return http.get('/students');
    }

    get(id) {
        return http.get(`/students/${id}`);
    }

    getByCourseId(id) {
        return http.get(`/students/course/${id}`);
    }

    create(data) {
        return http.post('/students', data);
    }

    update(id, data) {
        return http.put(`/students/${id}`, data);
    }

    delete(id) {
        return http.delete(`/students/${id}`);
    }
}

export default StudentService;
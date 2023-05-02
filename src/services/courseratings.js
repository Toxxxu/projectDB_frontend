import http from '../utils/api';

class CourseRatingService {
    getAll() {
        return http.get('/courserating');
    }

    get(id) {
        return http.get(`/courserating/${id}`);
    }

    create(data) {
        return http.post('/courserating', data);
    }

    update(id, data) {
        return http.put(`/courserating/${id}`, data);
    }

    delete(id) {
        return http.delete(`/courserating/${id}`);
    }
}

export default CourseRatingService;
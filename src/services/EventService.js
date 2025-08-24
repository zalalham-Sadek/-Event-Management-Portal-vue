import api from './api';

const EventService = {

  // Get all users
  getAllEvents() {
    return api.get('/api/events');
  },

    // Get event by ID
    getEventById(id) {
      return api.get(`/api/events/${id}`);
    },
    // Create new event
    createEvent(eventData) {
        return api.post('/api/events/create', eventData);
    },
    // Update event
    updateEvent(id, eventData) {
        return api.put(`/api/events/${id}`, eventData);
    },
    // Delete event
    delete(id) {    
        return api.delete(`/api/events/${id}`);
    }

};

export default EventService;

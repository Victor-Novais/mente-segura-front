import api from '../api';

export async function getRegistrationCode() {
    const response = await api.get('/companies/registration-code');
    return response.data;
}

export async function regenerateRegistrationCode() {
    const response = await api.post('/companies/generate-code');
    return response.data;
}

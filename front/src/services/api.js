import axios from "axios";

const API_BASE_URL = "http://localhost:8080";


// CLIENTE
export const getUserData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const postUserData = async (endpoint, data) => {
  try {
    const response = await axios.post (`${API_BASE_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

export const putUserData = async (endpoint, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${endpoint}`, data)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// SERVICO
export const putService = async (data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/servicos`, data)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const postService = async (email, data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/servicos?emailPrestador=${email}`, data)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const patchService = async (id, data) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/servicos/atualizar/${id}`, data)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const putServiceDisponibility = async (endpoint) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${endpoint}`)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const deleteService = async (endpoint) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${endpoint}`)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// PRESTADOR
export const getProviderUserData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getTimesByEmailAndDate = async (email, date) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/prestador-de-servico/horarios/${email}/${date}`)
    //console.log(response)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getProviders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/prestador-de-servico`)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const postProviderUserData = async (endpoint, data) => {
  try {
    const response = await axios.post (`${API_BASE_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

export const putProviderUserData = async (endpoint, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${endpoint}`, data)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// AGENDAMENTO

export const getProviderAppointments = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/agendamentos/prestador/${email}`)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getClientAppointments = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/agendamentos/cliente/${email}`)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const cancelAppointment = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/agendamentos/${id}`)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const postAppointment = async (data) => {
  try {
    const response = await axios.post (`${API_BASE_URL}/agendamentos`, data);
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

// AGENDA



// DIAS



// HORARIOS
export const getTimes = async (date) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/horarios/${date}`)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const putHorarioFalse = async (id) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/horarios/desativar/${id}`)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getHorarioIdByAgendaDateAndTime = async (idAgenda, date, time) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/horarios/retornar/${idAgenda}/${date}/${time}`)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const putAlternateHorarioDisponibility = async (id) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/horarios/${id}`)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const deleteTime = async(id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/horarios/${id}`)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// T
export const getAgendaId = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/agenda/id/${email}`)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getTimeByAgendaIdAndDate = async (id, date) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/horarios/listar/${id}/${date}`)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
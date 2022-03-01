//const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const API_URI = 'http://localhost:3000';

const agendaService = {
    getContacts: async () => {
        try {
            const response = await fetch(`${API_URI}/agenda`);
            if (response.status === 200) {
                const data = await response.json();
                return data;
                //console.log(data[0].nombres);
            }
            else {
                console.log('Ha ocurrido un error ' + response.status);
                return 0;
            }
        }
        catch (error) {
            console.error(error);
        }
        
    },
    getContact: async (id) => {
        try {
            const response = await fetch(`${API_URI}/agenda/${id}`)
            if (response.status === 200) {
                const data = await response.json();
                return data;
            }
            else {
                console.log('Ha ocurrido un error ' + response.status);
                return 0;
            }
        }
        catch (error) {
            console.error(error);
        }
    },
    addContact: async (contact) => {
        try {
            const response = await fetch(`${API_URI}/agenda/add`, {method: 'POST', body: JSON.stringify(contact), headers: {'Content-Type': 'application/json'}});
            if (response.status === 200) {
                console.log(response);
            }
            else {
                console.log('Ha ocurrido un error ' + response.status);
                return 0;
            }
        }
        catch (error) {
            console.error(error);
        }
    },
    updateContact: async (id, update) => {
        try {
            const response = await fetch(`${API_URI}/agenda/${id}`, {method: 'PUT', body: JSON.stringify(update), headers: {'Content-Type': 'application/json'}});
            if (response.status === 200) {
                console.log(response);
            }
            else {
                console.log('Ha ocurrido un error ' + response.status);
                return 0;
            }
        }
        catch (error) {
            console.error(error);
        }
    },
    deleteContact: async (id) => {
        try {
            const response = await fetch(`${API_URI}/agenda/${id}`, {method: 'DELETE'});
            if (response.status === 200) {
                console.log(response);
            }
            else {
                console.log('Ha ocurrido un error ' + response.status);
                return 0;
            }
        }
        catch (error) {
            console.error(error);
        }
    },
    searchContacts: async (search) => {
        try {
            const response = await fetch(`${API_URI}/agenda/busqueda/${search}`, {method: 'GET', headers: {'Content-Type': 'application/json'}});
            if (response.status === 200) {
                const data = await response.json();
                return data;
            }
            else {
                console.log('Ha ocurrido un error ' + response.status);
                return 0;
            }
        }
        catch (error) {
            console.error(error, 'Input: ' + search);
        }
    }
}

export default agendaService;
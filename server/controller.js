const pool = require('./database').pool;

getContacts = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM contactos WHERE id > 1', (error, contacts) => {
            if (error) return reject(error);
            return resolve(contacts);
        });
    });
}

getContact = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM contactos WHERE id = ?', [id], (error, contact) => {
            if (error) return reject(error);
            return resolve(contact[0]);
        });
    });
}

addContact = (contact) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO contactos SET ?', [contact], (error, response) => {
            if (error) return reject(error);
            return resolve('ID:' + response.insertId);
        });
    });
}

updateContact = (id, update) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE contactos SET ? WHERE id = ?', [update, id], (error) => {
            if (error) return reject(error);
            return resolve('Updated ID:' + id);
        });
    });
}

deleteContact = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM contactos WHERE id = ?', [id], (error) => {
            if (error) return reject(error);
            return resolve('Deleted ID:' + id);
        })
    })
}

searchContacts = (search) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM contactos WHERE ((nombres LIKE '${'%'+search+'%'}') OR (apellidos LIKE '${'%'+search+'%'}')) AND (id != 1)`, (error, contacts) => {
            if (error) return reject(error);
            return resolve(contacts);
        })
    })
}

module.exports = {
    getContacts,
    getContact,
    addContact,
    updateContact,
    deleteContact,
    searchContacts
}
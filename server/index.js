const express = require('express');
const cors = require('cors');
const controller = require('./controller.js');

const Server = {
    app: express(),
    config: function () {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false}));
    },
    routes: function () {
        this.app.get('/agenda', async (req, res) => {
          const contacts = await controller.getContacts();
          res.json(contacts);
          console.log(contacts);
        })
        this.app.get('/agenda/:id', async (req, res) => {
          const contact = await controller.getContact(req.params.id);
          res.json(contact);
        })
        this.app.post('/agenda/add', async (req, res) => {
          const response = await controller.addContact(req.body);
          res.send(response);
        })
        this.app.put('/agenda/:id', async (req, res) => {
          const response = await controller.updateContact(req.params.id, req.body);
          res.send(response);
        })
        this.app.delete('/agenda/:id', async (req, res) => {
          const response = await controller.deleteContact(req.params.id);
          res.send(response);
        })
        this.app.get('/agenda/busqueda/:search', async (req, res) => {
          const contacts = await controller.searchContacts(req.params.search);
          res.json(contacts);
        })
    },
    start: function () {
        this.config();
        this.routes();
        this.app.listen(this.app.get('port'), () => {
          console.log('Server on port ' + this.app.get('port'));
        })
    }
}

Server.start();

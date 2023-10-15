import express from 'express';
import RegistrationService from '../services/registrationService.js'

const router = express.Router();

const registrationService = new RegistrationService();

router.post("/", async (req, res) => {
    const formValues = req.body.formValues;
    const ret = await registrationService.handleSignUp(formValues);
    if (ret?.status == 'created'){
        console.log('serializing user. login: '+formValues.email);
        req.session.passport = {user: {login: formValues.email}};
        res.status(201).send({url: process.env.FRONTEND + '/profile', status: 'success'});
    }
    else
        res.status(400).send({ status: 'failure', error: ret?.value });
})

export default router;
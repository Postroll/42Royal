import express from 'express';
import ProblemService from '../services/problemService.js'
import problemValidator from '../validator/problemValidator.js';

const router = express.Router();

const problemService = new ProblemService();

router.get("/", async (req, res) => {
    const page = req.query;
    const problems = await problemService.GetAllProblemsPage(page);
    res.send(problems);
})

router.get("/review", async (req, res) => {
    const problem = await problemService.GetRandomProblem();
    console.log(problem);
    res.status(201).json(problem);
})

router.get("/:id", async (req, res) => {
    const problem = await problemService.GetByID(req.params.id);
    console.log(problem);
    res.send(problem);
})

router.post("/", 
    problemValidator.problemValidationRules(),
    problemValidator.validateProblem,
    (req, res) => {
        const payload = req.body;
        problemService.CreateProblem(payload);
        return res.status(201).json({ status: "ok"});
})

router.delete("/:id", async (req, res) => {
    const ret = await problemService.DeleteById(req.params.id);
    res.status(201).json({ deletedCount: ret});
})

router.patch("/:id", async (req, res) => {
    const ret = await problemService.UpdateOne(req.body);
    res.status(201).json({ updated: ret});
})


router.patch("/review/:id", async (req, res) => {
    const state = req.query.state;
    if (state !== 'true' && state !== 'false')
        res.status(402).json('error in the request');
    const ret = await problemService.UpdateOne(req.body, state);
    console.log(ret);
    res.status(201).json({ updated: ret});
})

export default router;
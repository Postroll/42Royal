import Problem from "../models/problem.js";

export default class ProblemService {
    constructor () {}
    async CreateProblem(data){
        console.log(data);
        await Problem.create({
            "gameType": data.gameType,
            "title": data.title,
            "language": data.language,
            "theme": data.theme,
            "description": data.description,
            "mainCode": data.mainCode,
            "workingSolution": data.workingSolution,
            "initialCode": data.initialCode,
            "stdin": data.stdin,
            "expectedOutput": data.expectedOutput,
            "createdBy": 0
          });
        return 0;
    }

    async GetAllProblems(){
        const problems = await Problem.find({});
        const count = await Problem.count({})
        return {count, problems};
    }

    async GetAllProblemsPage({page}){
        !page ? page = 0 : '';
        page > 0 ? page = page - 1 : '';
        const limit = 10;
        const problems = await Problem.find().skip(page * limit).limit(limit);
        const count = await Problem.count({})
        return {count, problems};
    }

    async GetByID(data){
        const problem = await Problem.findById(data);
        return problem;
    }

    async DeleteById(data){
        const ret = await Problem.deleteOne({ _id: data })
        return ret;
    }

    async UpdateOne(data, state){
        if (state){
            data.reviewed_by = ["admin"];
            if (state == 'true')
                data.status = "Accepted";
            else
                data.status = "Rejected";
        }
        let ret = await Problem.findById(data._id);
        await ret.updateOne(data);
        ret = await Problem.findById(data._id);
        return ret;
    }

    async GetRandomProblem(){
        const problem = await Problem.aggregate([ 
            { $match: { status: "Under review"  } },
            { $sample: { size: 1 } } 
        ])
        return problem[0];
    }
    
    async GetRandomProblemGame(options){
        try{
            const problems = await Problem.aggregate([ 
                { $match: { 
                    status: "Accepted",
                    game_type: options.gameType,
                    theme: options.theme,
                    language: options.language,
                } },
                { $sample: { size: parseInt(options.numberOfQuestions) } } 
            ])
            return problems;
        }catch(e){
            console.log('GetRandomProblemGame error '+e);
            return null;
        }
    }
}
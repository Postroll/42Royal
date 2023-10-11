export default class Judge0Service{
    constructor(){}

    async SubmitCode(code, options){
        let token;
        code = options.mainCode + code;
        console.log("-----------code------------")
        console.log(code);
        await fetch('http://server:2358/submissions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:  JSON.stringify({
                "source_code": code,
                "number_of_runs":null,
                "stdin": options.stdin,
                "language_id": options.language_id,
                "expected_output": options.expectedOutput,
                "cpu_time_limit":null,
                "cpu_extra_time":null,
                "wall_time_limit":null,
                "memory_limit":null,
                "stack_limit":null,
                "max_processes_and_or_threads":null,
                "enable_per_process_and_thread_time_limit":null,
                "enable_per_process_and_thread_memory_limit":null,
                "max_file_size":null,
                "enable_network":null
            }),
        })
        .then((res) => res.json())
        .then((data) => {token = data.token})
        .catch((e) => console.log(e))
        return token; 
    } 

    async GetResult(token){
        let ret;
        await fetch('http://server:2358/submissions/'+token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((data) => {ret = data}) 
        .catch((e) => console.log(e))
        return ret;
    }
}
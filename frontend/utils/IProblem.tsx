export default interface IProblem{
    _id: string,
    title: string,
    status: string,
    game_type: string,
    language: string[],
    stdin: string,
    expected_output: string,
    description: string,
    initial_code: string,
    reviewed_by: string[]
    created_by: string,
    created_at?: Date,
}
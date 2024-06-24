import { Tasks } from "../tasks";

export interface TasksResponse
{
    success: boolean;
    message: string;
    data: Tasks;
}

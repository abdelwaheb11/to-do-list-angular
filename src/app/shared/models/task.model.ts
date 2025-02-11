export default class Task {
    _id!:string;
    title!:string
    desc?:string
    completed?:boolean
    createdAt?:Date
    completedAt?:Date
}
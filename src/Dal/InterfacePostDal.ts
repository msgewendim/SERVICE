export interface DataAccess <T>{
    getPost(id:number) : Promise<T>,
    getAllPosts() : Promise<T[]>,
    deletePost(id : number) : Promise<void>,
    updatePost(id : number, postData : Partial<T>) : Promise<void>,
    addPost(t:T) : Promise<void>
}
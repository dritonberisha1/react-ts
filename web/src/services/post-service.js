import BaseService from './base-service';
class PostService extends BaseService{

    fetchPosts(){
        return this._apiGet({
            rootPath: 'https://jsonplaceholder.typicode.com',
            path: '/posts'
        })
    }
}

export default new PostService();
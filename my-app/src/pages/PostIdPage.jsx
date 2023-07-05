import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching.jsx';
import PostService from '../API/PostService.jsx';
import Loader from '../components/UI/Loader/Loader.jsx';

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading ,error] = useFetching( async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data);
    })
    const [fetchComments, isComLoading ,comError] = useFetching( async (id) => {
        const response = await PostService.getCommentsByPostId(id)
        setComments(response.data);
    })
    useEffect(()=>{
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])

    return (
        <div>
            <h1>Вы открыли страницу поста c ID = {params.id} </h1>
                {isLoading
                ? <Loader/>
                : <div>{post.id}. {post.title}</div>
                }
                <h1>
                    Комментарии 
                </h1>
                {isComLoading
                ? <Loader/>
                : <div>
                    {comments.map(comm =>
                       <div key={comm.id} style={{margin: 15}}>
                       <h5>{comm.email}</h5>
                       <div>{comm.body}</div>
                       </div>
                        )}
                   </div>
                }
          </div>
    );
};

export default PostIdPage;
import React, { useEffect, useState } from 'react';
import PostList from '../components/PostList'
import MyButton from '../components/UI/button/MyButton';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal';
import { usePosts } from '../hooks/usePosts';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching.jsx';
import { getPageCount } from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import { useRef } from 'react';
import MySelect from '../components/UI/select/MySelect.jsx';


function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const lastElement = useRef()
  const observer = useRef();
  console.log(lastElement)

  const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data])
    const totalCount = (response.headers['x-total-count'])
    setTotalPages(getPageCount(totalCount, limit));
  })

  useEffect(() => {
    if (isPostLoading) return;
    if(observer.current) observer.current.disconnect();
    var callback = function (entries, observer) {
      if (entries[0].isIntersecting && page < totalPages) {
        console.log(page)
        setPage(page + 1)

      }
    };
    observer.current = new IntersectionObserver(callback);
    observer.current.observe(lastElement.current)
  }, [isPostLoading])

  useEffect(() => {
    fetchPosts(limit, page)
  }, [page, limit])







  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }


  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
  }



  return (
    <div className="App">
      <button onClick={fetchPosts}>GET POSTS</button>
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 8' }} />
      <PostFilter
        filter={filter}
        setFilter={setFilter} />
        <MySelect 
        value={limit}
        onChange={value=>setLimit(value)}
        defaultValue="Кол-во элементов на странице"
        options={[
          {value:5, name: '5'},
          {value:10, name: '10'},
          {value:25, name: '25'},
          {value: -1, name: 'Показать все'},
        ]}
        />
      {postError &&
        <h1>Произошла ошибка ${postError}</h1>

      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS" />
      <div ref={lastElement} style={{ height: 20, background: 'red' }} />
      {isPostLoading &&
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><Loader /></div>}
      <Pagination
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      />

    </div>
  );
}

export default Posts;

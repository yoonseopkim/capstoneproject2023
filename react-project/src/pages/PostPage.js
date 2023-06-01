import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Comment from '../components/Comment';

function PostPage() {
  const { id } = useParams();
  const [comment, setComment] = useState([]); //댓글 데이터
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    fetchPostData();
  }, []);

  const fetchPostData = async () => {
    try {
      const response = await axios.get('https://confident-craft-384109.du.r.appspot.com/postData');
      const postData = response.data.find((item) => item.id === parseInt(id));
      setPost(postData);
      setLoading(false); // 데이터 가져오기 성공 시 로딩 상태 해제
    } catch (error) {
      console.log('게시글 가져오기 오류:', error);
      setLoading(false); // 데이터 가져오기 실패 시 로딩 상태 해제
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className='post_align post_wrap'>
      <h2 style={{marginTop: "100px"}}>{post.title}</h2>
      <h5 style={{marginTop: "20px", marginBottom: "70px"}}>작성자: {post.author}</h5>
      <h5 style={{marginBottom: "70px"}}>{post.content}</h5>
      <h5>작성일: {post.date}</h5>
      <div style={{paddingBottom: "3%"}}> <Comment key={comment.id} comment={comment} /> </div>
    </div>
  );
}

export default PostPage;

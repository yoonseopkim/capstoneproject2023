import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GrSearch } from 'react-icons/gr';

function Board() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    fetchPosts(); // 게시글 데이터 가져오기
  }, []);

  // 게시글 데이터 가져오기
  const fetchPosts = async () => {
    try {
      const response = await fetch('https://confident-craft-384109.du.r.appspot.com/postData');
      const data = await response.json();
      const sortedPosts = data.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (dateA > dateB) return -1;
        if (dateA < dateB) return 1;
        // 작성일 같으면 번호 높은게 먼저 노출
        if (a.id > b.id) return -1;
        if (a.id < b.id) return 1;
        return 0;
      });
      setPosts(sortedPosts);
    } catch (error) {
      console.log('게시글 가져오기 오류:', error);
    }
  };
  
  // 게시글 검색 처리 함수
  const handleSearch = (e) => {
    e.preventDefault(); // 폼 기본 동작 방지

    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredPosts);
    setCurrentPage(1); // 검색 결과에서 첫 번째 페이지로 이동
    setSearchTerm('');
  };

  const displayPosts = searchResults.length > 0 ? searchResults : posts;

  // 현재 페이지의 게시글 범위 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = displayPosts.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 번호 변경 처리 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(displayPosts.length / postsPerPage);

  return (
    <div className='board_align'>
      <h2 style={{ marginTop: '-20px', marginBottom: '60px' }}>게시판</h2>

      {/* 게시글 목록 */}
      <table className="board-table">
        <thead>
          <tr>
            <th style={{ width: '10%', fontSize: '27px' }}>번호</th>
            <th style={{ width: '40%', fontSize: '27px' }}>제목</th>
            <th style={{ width: '20%', fontSize: '27px' }}>작성자</th>
            <th style={{ width: '30%', fontSize: '27px' }}>작성일</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <tr key={post.id}>
              <td style={{ verticalAlign: 'middle', fontSize: '25px' }}>{post.id}</td>
              <td style={{ verticalAlign: 'middle' }}>
                <Link to={`/post/${post.id}`} style={{ display: 'inline-block', fontSize: '25px', textDecorationLine: "none" }}>
                  {post.title}
                </Link>
              </td>
              <td style={{ verticalAlign: 'middle', fontSize: '25px' }}>{post.author}</td>
              <td style={{ verticalAlign: 'middle', fontSize: '25px' }}>{post.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지 번호 */}
      <ul className="pagination" style={{ justifyContent: 'center', marginTop: "5%"}}>
        <li className="page-item">
          <p
            className="page-link"
            aria-label="Previous"
            style={{ color: 'black' }}
            onClick={() => 1 < currentPage ? setCurrentPage(currentPage - 1) : setCurrentPage(1)}
          >
            <span aria-hidden="true">&laquo;</span>
          </p>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li className="page-item" key={index}>
            <p className="page-link" style={{ color: 'black' }} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </p>
          </li>
        ))}
        <li className="page-item">
          <p
            className="page-link"
            aria-label="Next"
            style={{ color: 'black' }}
            onClick={() => currentPage < totalPages ? setCurrentPage(currentPage + 1) : setCurrentPage(totalPages)}
          >
            <span aria-hidden="true">&raquo;</span>
          </p>
        </li>
      </ul>

        {/* 게시글 검색 폼 */}
        <form onSubmit={handleSearch} style={{marginBottom: "1%"}}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="검색어를 입력하세요"
          />
          <button type="submit">
            <GrSearch />
          </button>
        </form>

        {/* 글쓰기 버튼 */}
          <button onClick={()=>{ navigate('/write') }}
          style={{marginBottom: "3%"}}>글쓰기 </button>
    </div>
  );
}

export default Board;
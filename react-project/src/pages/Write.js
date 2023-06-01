import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Write() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [posts, setPosts] = useState([]); // 게시글 목록 상태

  // 파일 첨부 처리 함수
  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // 선택한 파일을 내용에 추가
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const uploadedContent = event.target.result;
        setContent(uploadedContent);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // 게시글 업로드 처리 함수
  const handleUpload = () => {
    // 게시글 업로드 로직 작성
    // 새로운 게시글을 등록하고 목록에 추가하는 등의 동작 수행

    // 게시글 객체 생성
    const newPost = {
      title: title,
      content: content,
      file: file,
      // 추가적인 필드들이 있다면 여기에 추가
    };

    // 게시글을 등록하는 로직 구현 필요
    // 데이터베이스에 저장, API를 호출하여 업로드 해야함

    // 예시: 게시글 목록 상태 업데이트
    // 이전 게시글 목록 상태를 복사하고, 새로운 게시글을 추가
    const updatedPosts = [...posts, newPost];

    // 게시글 목록 상태 업데이트
    setPosts(updatedPosts);

    // 게시판 페이지로 이동
    navigate('/board');
  };

  // 취소 버튼 클릭 시 게시판 페이지로 이동
  const handleCancel = () => {
    navigate('/board');
};

  return (
    <div className="align write_wrap">
      <div className="write_container">
          <h2>글 제목</h2>
          <input
          type="text"
          className="input-title"
          placeholder="제목을 입력하세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />
          <h3 style={{marginTop: "30px"}}>내용</h3>
          <textarea
          className="input-content"
          placeholder="내용을 입력하세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="upload-buttons">
  <label htmlFor="file-input" className="custom-addfile">
    파일 첨부
    <input
      id="file-input"
      type="file"
      style={{ display: 'none' }}
      onChange={handleFileUpload}
    />
  </label>
  <button className="custom-upload-button" onClick={handleUpload}>
    업로드
  </button>
  <button className="custom-cancel-button" onClick={handleCancel}>
    취소
  </button>
</div>
      </div>
);
}

export default Write;
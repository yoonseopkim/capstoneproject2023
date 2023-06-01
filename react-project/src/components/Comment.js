import React, { useState } from "react";
import { Form } from 'react-bootstrap';
import { GrLike, GrDislike } from "react-icons/gr";

function Comment(props) {
  const [comments, setComments] = useState(props.comment);
  const [userInput, setUserInput] = useState('');
  const [likedComments, setLikedComments] = useState([]);
  const [dislikedComments, setDislikedComments] = useState([]);

  let today = new Date(); // 현재 시간 구하기
  let nowYear = today.getFullYear(); // 년도
  let nowMonth = today.getMonth() + 1;  // 월
  let nowDate = today.getDate();  // 날짜
  let nowHours = today.getHours(); // 시
  let nowMinutes = today.getMinutes();  // 분

  const handleAddComment = (event) => {
    event.preventDefault(); // 폼 제출 기본 동작 막기

    const newComment = {
      text: userInput,
      like: 0,
      dislike: 0,
      date: `${nowYear}-${nowMonth}-${nowDate} ${nowHours}:${nowMinutes}`,
    };
    setComments([newComment, ...comments]);
    setUserInput("");
  };

  const handleDeleteComment = (index) => {
    const copy = [...comments];
    copy.splice(index, 1);
    setComments(copy);
  };

  const handleLikeComment = (index) => {
    const copy = [...comments];
    if (likedComments.includes(index)) {
      // 이미 좋아요를 누른 경우
      return;
    }
    if (dislikedComments.includes(index)) {
      // 싫어요를 이미 누른 경우
      alert("이미 싫어요를 누르셨습니다.");
      return;
    }
    copy[index].like += 1;
    setComments(copy);
    setLikedComments([...likedComments, index]);
  };

  const handleDislikeComment = (index) => {
    const copy = [...comments];
    if (dislikedComments.includes(index)) {
      // 이미 싫어요를 누른 경우
      return;
    }
    if (likedComments.includes(index)) {
      // 좋아요를 이미 누른 경우
      alert("이미 좋아요를 누르셨습니다.");
      return;
    }
    copy[index].dislike = copy[index].dislike !== undefined ? copy[index].dislike + 1 : 1;
    setComments(copy);
    setDislikedComments([...dislikedComments, index]);
  };

  return (
    <>
      <div style={{paddingBottom: "2%"}}>
        <Form className="d-flex comment_form">
          <Form.Control
            type="text"
            placeholder="댓글을 입력해주세요."
            className="me-2"
            aria-label="Text"
            value={userInput}
            onChange={(e)=> {
              setUserInput(e.target.value);
            }}
          />
          <button
            className="btn btn-danger"
            style={{ width : "13%" }}
            onClick={handleAddComment}
          >
            글쓰기
          </button>
        </Form>
      </div>
      {comments.map((comment, index) => (
        <div className="comment_align" key={index}>
          <h5>{comment.text}</h5>
          <div className="reaction">
            <span>
              <GrLike
                onClick={() => handleLikeComment(index)}
                style={{ color: likedComments.includes(index) ? "blue" : "inherit", marginRight: "5px" }}
              />
            </span>
            <span>{comment.like}</span>
            <span>
              <GrDislike
                onClick={() => handleDislikeComment(index)}
                style={{ color: dislikedComments.includes(index) ? "red" : "inherit", marginLeft: "10px", marginRight: "5px" }}
              />
              {comment.dislike !== undefined ? comment.dislike : 0}
            </span>
          </div>
          <div style={{ display: "inlineBlock" }}>
            <p>{comment.date}</p>
            <span style={{ color: "rgb(200, 30, 30)" }}
            onClick={() => handleDeleteComment(index)}>삭제</span>
          </div>
        </div>
      ))}
    </>
  );
}

export default Comment;

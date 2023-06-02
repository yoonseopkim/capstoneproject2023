import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get('https://confident-craft-384109.du.r.appspot.com/loginData')
      .then((res) => {
        const loginData = res.data;
        const isValidUser = loginData.some((user) => user.id === inputId && user.pw === inputPw);

        if (isValidUser) {
          setIsLoggedIn(true); // 로그인 상태 업데이트
          localStorage.setItem('id', inputId);
          navigate('/');
        } else if (inputId === '' && inputPw === '') {
          alert('아이디와 비밀번호를 입력하세요.');
        } else {
          alert('아이디와 비밀번호를 확인하세요.');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClickSignup = () => {
    navigate('/signup');
  };

  const onClickFindId = () => {
    // Handle find ID logic
    alert('아이디를 찾습니다.');
  };

  const onClickFindPassword = () => {
    // Handle find password logic
    alert('비밀번호를 찾습니다.');
  };

  return (
    <div>
      <div className="login wrap">
        <h1 style={{ marginBottom: '40px', fontSize: '35px' }}>로그인</h1>
        <Form onSubmit={handleSubmit}>
          <div className="id_pw_align">
            <Form.Label>아이디</Form.Label>
            <Form.Control
              type="text"
              name="input_id"
              value={inputId}
              onChange={handleInputId}
              style={{ height: '45px' }}
            />
            <Form.Label htmlFor="inputPassword5">비밀번호</Form.Label>
            <Form.Control
              type="password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              name="input_pw"
              value={inputPw}
              onChange={handleInputPw}
              style={{ height: '45px' }}
            />
          </div>
          <Button variant="outline-success" size="large" style={{marginTop: '13%', width: "180px"}} type="submit">
            확인
          </Button>
        </Form>
        <hr></hr>
        <div style={{ fontSize: '15px', textAlign: 'center' }}>
          <span variant="link" onClick={onClickFindId} style={{marginRight: "20px"}}>
            아이디 찾기
          </span>{' '}
          <span variant="link" onClick={onClickFindPassword}>
            비밀번호 찾기
          </span>
        </div>
        <div style={{ marginTop: '13%' }}>
          <Button variant="outline-success" size="large" onClick={onClickSignup}>
            회원가입
          </Button>
        </div>
        {isLoggedIn && <p>로그인되었습니다.</p>}
      </div>
    </div>
  );
}

export default Login;

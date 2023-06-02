import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');
  const navigate = useNavigate();

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  
  const onClickSignup = () => {
    if (inputId === '' || inputPw === '') {
      alert('아이디와 비밀번호를 입력하세요.');
    } else {
        // Save signup info to local storage
      const signupInfo = {
        id: inputId,
        pw: inputPw,
      };

      localStorage.setItem('signupInfo', JSON.stringify(signupInfo));
      
      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    }
  };

  return (
    <div className='align signUp_wrap'>
    <Container>
      <Row className="justify-content-center">
        <Col md={2}>
          <div style={{marginTop: "20%"}}>
            <h1 style={{ marginBottom: '40px', fontSize: '35px' }}>회원가입</h1>
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>아이디</Form.Label>
                <Form.Control
                  type="text"
                  name="input_id"
                  value={inputId}
                  onChange={handleInputId}
                  style={{ height: '45px' }}
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control
                  type="password"
                  name="input_pw"
                  value={inputPw}
                  onChange={handleInputPw}
                  style={{ height: '45px' }}
                />
              </Form.Group>
              <Button variant="outline-success" size="large" style={{ marginTop: '13%' }} onClick={onClickSignup}>
                회원가입
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default Signup;

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Container, Row, Col  } from 'react-bootstrap';
import { AiFillHeart } from "react-icons/ai";
import Comment from '../components/Comment';

function Detail() {

  const { id } = useParams();
  const [detail, setDetail] = useState([]); //상세 데이터
  const [comment, setComment] = useState([]); //댓글 데이터
  const [totalLike, setTotallike] = useState();
  const [loading, setLoading] = useState(false);


   //데이터 가져오기
    useEffect(() => {
     setLoading(false);
    axios.get(`https://confident-craft-384109.du.r.appspot.com/detaildata/${id}`)
      .then((res)=>{
        setLoading(true);
        setDetail(res.data);
        setTotallike(res.data.totalLike);
        setComment(res.data.comments);
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);


    if( loading ) {
      return (
        <>
        <Container>
         <Row>
          <Col className="d-flex">
            <div className="align-self-center">
              <img className="detail_image" alt="Recipe_image" src={detail.img} />
            </div>
          </Col>
          <Col>
          <div style={{marginTop: '40px'}}>
            <h4 style={{marginTop: '20px'}}> {detail.name} </h4>
            <p> {detail.kcal}kcal </p>
            <hr></hr>
            <h4> {detail.ingredients.join(', ')}을(를) 준비해주세요. </h4>
            <div style={{marginTop: '40px'}}>
              { detail.manuals.map((manual, i) => {
              return (
                  <h5 style={{marginBottom: "20px"}} key={manual.id}  manual={manual}> {i+1} {manual}</h5>
                  )
               })}
               <hr></hr>
              <span onClick={ ()=>{ setTotallike(totalLike + 1) }} style={{fontSize: "20px"}}> 도움 됐어요 <AiFillHeart size="25px" color="red"/> { totalLike } </span> 
            </div>
            </div>     
          </Col>
         </Row>
         <div style={{paddingBottom: "7%"}}> <Comment key={comment.id} comment={comment} /> </div>
       </Container>
        </>
      );
    }
    
    
  }
  
  export default Detail;
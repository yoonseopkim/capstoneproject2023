const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());
var cors = require('cors');
app.use(cors());
app.use(express.urlencoded({extended: true})) 

const MongoClient = require('mongodb').MongoClient; //몽고디비 접속

var db;
MongoClient.connect('mongodb+srv://qc70045:Kysbandi12!@cluster0.dboj85a.mongodb.net/?retryWrites=true&w=majority', function(에러, client){
  if (에러) return console.log(에러)
  db=client.db('todoapp')

  /*db.collection('post').insertOne({제목 : '23년05월24일1번', 내용 : '_id를 id로 할지 _ㅑㅇfh vkgwl 테스트 해야합니다.'},function(에러,결과){
    console.log('저장완료');
  });*/

  app.listen(8080, function(){
    console.log('listening on 8080')
  });
})

app.post('/add', function(요청, 응답){
  응답.send('전송완료');
  db.collection('post').insertOne( { 제목 : 요청.body.title, 내용 : 요청.body.date } , function(){
    console.log('저장완료')
  });
});

//지금 쓰는 데이터
  app.get('/recipeData', function(요청, 응답) {
    db.collection('recipe').find().toArray(function(err, data){
      if (err) return console.log(err);
      응답.json(data);
    });
  });
//레시피 데이터 나눠달라해서 번호별로
  app.get('/detailData/:id', function(요청, 응답) {
    let id = parseInt(요청.params.id);
    db.collection('recipe').findOne({id: id}, function(에러, data) {
      if (에러) return console.log(에러);
      if (data) 
        응답.json(data);   
    });
  });

//게시판 제목,내용 데이터 페이지.
  app.get('/postData', function(요청, 응답) {
    db.collection('post').find().toArray(function(err, data){
      if (err) return console.log(err);
      응답.json(data);
    });
  });

  //댓글기능
   app.get('/commentData', function(요청, 응답) {
    db.collection('comment').find().toArray(function(err, data){
      if (err) return console.log(err);
      응답.json(data);
    });
  });

  //로그인데이터
   app.get('/loginData', function(요청, 응답) {
    db.collection('login').find().toArray(function(err, data){
      if (err) return console.log(err);
      응답.json(data);
    });
  });

//리액트 관련
app.use(express.static(path.join(__dirname, 'react-project1/build')));

app.get('/', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '/react-project1/build/index.html'));
});

app.get('*', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '/react-project1/build/index.html'));
});
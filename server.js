const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs');
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
require('dotenv').config()
app.use('/public', express.static('public'));

// 노드 js는 싱글스레드로 한번에 유저가 몰릴경우 기아상태나 기타 에러가 놓이지 않게 함.

var db; //어떤 폴더에 저장할건지 명시
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(process.env.DB_URL,{ useUnifiedTopology: true }, function(에러,client){
if(에러) return console.log(에러)

  db = client.db('todoapp');

  db.collection('post').insertOne({이름 : 'kim', _id : 111}, function(에러, 결과){ //데이터 저장핳ㄹ 떄 사용
    console.log('저장완료');
  });

app.listen(process.env.PORT, function(){
  console.log('listening on 8080')
});

})



app.get('/beauty', function(요청,응답){
  응답.send('뷰티쇼핑 사이트');
});

app.get('/pet', function(요청,응답){
  응답.send('펫쇼핑 사이트aaaa');
});

app.get('/', function(요청,응답){
  응답.sendFile(__dirname+'/index.html')
});

app.get('/write', function(요청, 응답) { 
  응답.sendFile(__dirname +'/write.html')
});





app.get('/list', function(요청,응답){

  db.collection('post').find().toArray(function(에러, 결과){//모든 데이터 가져오기
    console.log(결과);
    응답.render('list.ejs', { posts : 결과});
  }); 
});

app.get('/search', (요청, 응답)=>{

  var 검색조건 = [
    {
      $search: {
        index: 'titleSearch',
        text: {
          query: 요청.query.value,
          path: '제목'  // 제목날짜 둘다 찾고 싶으면 ['제목', '날짜']
        }
      }
    },
    {$limit : 10},
  ] 
  console.log(요청.query);
  db.collection('post').aggregate(검색조건).toArray((에러, 결과)=>{
    console.log(결과)
    응답.render('search.ejs', {posts : 결과})
  })
})
 



app.get('/detail/:id', function(요청, 응답){
  db.collection('post').findOne({_id : parseInt(요청.params.id)},function(에러,결과){
    console.log(결과);
   응답.render('detail.ejs', {data : 결과});
  })
})

app.get('/edit/:id',function(요청,응답){
  db.collection('post').findOne({_id : parseInt(요청.params.id)},function(에러,결과){
   응답.render('edit.ejs',{post : 결과})
  })
  
})

app.put('/edit',function(요청,응답){
  db.collection('post').updateOne({_id : parseInt(요청.body.id) },{$set :  {제목 : 요청.body.title , 날짜 : 요청.body.date}},function(에러,결과){
    console.log('수정완료')
    응답.redirect('/list')
  })
});




const passport = require('passport');
const LocalStrategy= require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret : '비밀코드', resave : true, saveUninitialized : false}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/login',function(요청, 응답) { //접속하면
  응답.render('login.ejs')
});

app.post('/login', passport.authenticate('local', {
  failureRedirect : '/fail'
}), function(요청, 응답) { //이페이지 주세요
  응답.redirect('/')
});

app.get('/mypage', 로그인했니, function(요청, 응답){
 console.log(요청.user);
  응답.render('mypage.ejs', {사용자 : 요청.user})
})

function 로그인했니(요청, 응답, next) {
if( 요청.user) {
  next()
} else {
  응답.send("로그인 안했는데요?")
}
}


passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'pw',
  session: true,
  passReqToCallback: false,
}, function (입력한아이디, 입력한비번, done) {
  console.log(입력한아이디, 입력한비번);
  db.collection('login').findOne({ id: 입력한아이디 }, function (에러, 결과) {
    if (에러) return done(에러)

    if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })
    if (입력한비번 == 결과.pw) {
      return done(null, 결과)
    } else {
      return done(null, false, { message: '비번틀렸어요' })
    }
  })
}));


passport.serializeUser(function(user,done){
done(null,user.id)
});


passport.deserializeUser(function(아이디,done){
  db.collection('login').findOne({id : 아이디}, function(에러, 결과){
    done(null,결과)
  })
  });


  app.post('/register', function(요청, 응답){
    db.collection('login').insertOne({ id : 요청.body.id, pw : 요청.body.pw}, function(에러, 결과){
      응답.redirect('/')
    })
  })


  app.post('/add', function(요청, 응답){
  

    응답.send('전송완료');
    db.collection('counter').findOne({name: '게시물개수'}, function(에러, 결과){
      console.log(결과.totalPost)
      var 총게시물갯수 = 결과.totalPost;
  
      var 저장할거 = {  _id : 총게시물갯수 + 1,제목 : 요청.body.title, 날짜 : 요청.body.date, 작성자 :  요청.user._id}
  
      db.collection('post').insertOne(저장할거  , function(에러, 결과  ){
        console.log('저장완료');
        db.collection('counter').updateOne({name : '게시물개수'},{$inc:{totalPost:1}},function(에러, 결과){
          if(에러){return console.log(에러)}
        })
        
      });
  
  
  
    }); 
   
  });


  app.delete('/delete',function(요청,응답){
    console.log(요청.body);
    요청.body._id=parseInt(요청.body._id);
  
    var 삭제할데이터 = {_id : 요청.body._id, 작성자 : 요청.user._id }
  
    db.collection('post').deleteOne(요청.body,function(에러,결과){
      console.log('삭제완료');
      if(결과) {console.log(결과)}
      응답.status(200).send({ Message : '성공했습니다'});
    })
  
  });


app.use('/shop', require('./routes/shop.js'));

app.use('/board/sub', require('./routes/board.js'));
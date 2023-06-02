import { FiShoppingCart, FiEdit, FiThumbsUp, FiUser } from "react-icons/fi"


function MyPage() {
    return (
      <div className="align">
      <div className="mypage_wrap">
        <h2 style={{marginBottom: "70px"}}>내 정보</h2>
        <div className="mypage_back">
          <h4 className='mypage_menu' onClick={() => alert('준비중입니다.')}
          style={{paddingTop: "40px"}}><FiUser/> 내가 작성한 글</h4>
          <h4 className='mypage_menu' onClick={() => alert('준비중입니다.')}><FiEdit/> 내가 올린 레시피</h4>
          <h4 className='mypage_menu' onClick={() => alert('준비중입니다.')}><FiShoppingCart/> 찜한 레시피</h4>
          <h4 className='mypage_menu' onClick={() => alert('준비중입니다.')}><FiThumbsUp/> 저장한 글</h4>
        </div>
      </div>
      </div>
      )

}

export default MyPage;
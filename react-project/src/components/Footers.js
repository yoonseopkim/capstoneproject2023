import React from "react";
import insta from '../images/instagram.png';
import twitter from '../images/twitter.png';
import youtube from '../images/youtube.png';
import { FaFacebookSquare } from "react-icons/fa";

function Footers() {
    return (
       <footer>
            <div style={{paddingTop: "20px"}}>
                <span>대표 : 황호영</span>
                <span style={{marginLeft: "20px"}}>팀명 : Spyder</span><br/>
                <span>Spyder Inc. 서울특별시 성북구 삼선교로16길 116</span><br/>
                <span>Copyrightⓒ2023. Spyder Inc. All Rights Reserved.</span>
            </div>

            <nav style={{marginTop: "10px"}}>
                <a href='https://www.hansung.ac.kr' style={{textDecorationLine: "none"}}>HANSUNG</a> |
                <a href='https://github.com/cse-hansung/capstone2023' style={{textDecorationLine: "none"}}> Github</a>
            </nav>
            <div>
                <a href='https://www.youtube.com/@HansungUvi'>
                    <img src={youtube} style={{ width: "27px", marginLeft: "4px", marginRight: "2px"}}/>
                </a>
                <a href='https://www.instagram.com/hansung_univ_official'>
                    <img src={insta} style={{ width: "27.1px", marginLeft: "4px", marginRight: "2px"}}/>
                </a>
                <a href='https://www.facebook.com/hansunguniversity'>
                    <span><FaFacebookSquare color="#3b5998" size="30px"/></span>
                </a>
                <a href='https://twitter.com/hansung_univ'>
                    <img src={twitter} style={{ width: "27.3px", marginLeft: "4px", marginRight: "2px"}}/>
                </a>
            </div>
        </footer>
  )
}

export default Footers;

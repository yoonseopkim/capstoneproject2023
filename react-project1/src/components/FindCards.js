import React from 'react';
import { Card, Button, Nav } from 'react-bootstrap';
import { FcSms } from "react-icons/fc";
import { AiFillHeart } from "react-icons/ai";

function FindCards({ id, img, name, ingredients, totalLike, comments}) {

    return (
      <div className="col-md-3"  style={{width: '20%'}}>
        <Card border="warning" style={{marginTop: '60px', maxHeight: '700px'}}>
          <Card.Img style={{height: '300px'}} variant="top" src={img} />
            <Card.Title style={{marginTop: '20px'}}> {name} </Card.Title> 
                <Card.Text className="card_align">
                  재료 : {ingredients.join(', ')}
                 </Card.Text>
            <Card.Footer className='card_footer'> 
            <div className="text-muted" >
              <span> <AiFillHeart color="red" size="20px"/> {totalLike} </span>
              <span style={{marginLeft: "10px"}}> <FcSms size="22px"/> {comments.length} </span>
            </div>
          </Card.Footer>
         <Button variant="warning" >
            <Nav.Link href={`/detail/${ id }`} key={id}> 자세히 보기 </Nav.Link>
         </Button>
        </Card>
      </div>
    );
  }
  
  export default FindCards;
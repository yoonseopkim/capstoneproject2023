import { Card, Button, Nav } from 'react-bootstrap';
import { FcSms } from "react-icons/fc";
import { AiFillHeart } from "react-icons/ai";

function Cards(props) {

    return (
      <div className="col-md-3" style={{width: '20%'}}>
        <Card border="warning" style={{marginTop: '60px', maxHeight: '700px'}}>
          <Card.Img style={{height: '300px'}} variant="top" src={props.recipes && props.recipes.img} />
            <Card.Title style={{marginTop: '20px'}}> {props.recipes && props.recipes.name} </Card.Title> 
                <Card.Text className="card_align"> 
                  재료 : { props.recipes && props.recipes.ingredients.join(', ')}
                 </Card.Text>
            <Card.Footer className='card_footer'>
              <span> <AiFillHeart color="red" size="20px"/> {props.recipes && props.recipes.totalLike} </span>
              <span style={{marginLeft: "10px"}}> <FcSms size="22px"/> {props.recipes && props.recipes.comments.length} </span>
            </Card.Footer>
            <Button variant="warning">
            <Nav.Link href={`/detail/${props.recipes&&props.recipes.id}`} key={props.recipes && props.recipes.id}> 자세히 보기 </Nav.Link>
         </Button>
        </Card>
      </div>
    );
  }
  
  export default Cards;
import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from "react-router-dom";

function CustomArrows(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
    />
  );
}

export default function MainSlick(props) {
  const navigate = useNavigate();
  
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    pauseOnHover : true,
    arrows  : true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <CustomArrows />,
    prevArrow: <CustomArrows />,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2
        }
      },
      {
          breakpoint: 1440,
          settings: {
              slidesToShow: 2,
              slidesToScroll: 2
          }
      },
      {
          breakpoint: 1124,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1
          }
      },
      {
          breakpoint: 720,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1
          }
      },
      {
          breakpoint: 480,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1
          }
      },
      {
          breakpoint: 320,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1
          }
      }
  ]
  };

  return (
    <div>
      <Slider {...settings} style={{ width: "90%", margin: "0 auto" }}>
          { props.slickRecipe.map((recipe) => {
              return (
                <div>
                  <img
                    className="slick_img"
                    src={recipe[2]}
                    alt="slick_img"
                    onClick={() => { navigate(`/detail/${recipe[0]}`); }}
                    />
                </div>
                )
            })}
      </Slider>
    </div>
  );
}
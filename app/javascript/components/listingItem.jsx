import React from "react";
import styled from "styled-components";
import Slider from "react-slick";

const ItemContainer = styled.section`
  height: 180px;
  display: inline-flex;
  border-bottom: 1px solid #cec7c7;
`;
const PictureContainer = styled.span`
  padding: 30px 50px 0px 50px;
  max-width: 150px;
`;
const InfoContainer = styled.span``;
const Price = styled.span`
  color: green;
`;
const SquareMeterPrice = styled.span`
  color: red;
`;
const Picture = styled.img`
  height: 100px;
`;
export default class ListingItem extends React.Component {
  constructor(props) {
    super(props);
  }
  currencyFormat = num => {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
  };
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoad: true
    };
    return (
      <ItemContainer>
        <PictureContainer>
          <Slider {...settings}>
            {this.props.listing.pictures &&
              this.props.listing.pictures.length > 0 &&
              this.props.listing.pictures.map((picture, index) => {
                return <Picture key={index} src={picture} />;
              })}
          </Slider>
        </PictureContainer>
        <InfoContainer>
          <h2>
            {this.props.listing.postal_code} | {this.props.listing.subject} |{" "}
            <Price>{this.currencyFormat(this.props.listing.price)} €</Price>
          </h2>
          <p>
            <SquareMeterPrice>
              {this.currencyFormat(this.props.listing.square_meter_price)} €/m2{" "}
            </SquareMeterPrice>
            surface : {this.props.listing.surface}
            m2 | id: {this.props.listing.id} |
            <b> {this.props.listing.external_provider.toUpperCase()}</b> url :{" "}
            <a href={this.props.listing.url}>link</a>
          </p>
          <p>{this.props.listing.body.substring(0, 550)}</p>
        </InfoContainer>
      </ItemContainer>
    );
  }
}

import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import moment from "moment";
import "moment/locale/fr";

const ItemContainer = styled.section`
  border-bottom: 1px dotted #cec7c7;
  background-color: ${props => (props.isNew ? "#ffffeb" : "white")};
`;
const PictureContainer = styled.span`
  position: relative;
  bottom: 20px;
  padding: 30px 50px 0px 50px;
`;
const InfoContainer = styled.span``;
const Price = styled.span`
  color: green;
`;
const SquareMeterPrice = styled.span`
  color: red;
`;
const Picture = styled.img`
  height: 145px;
  border-radius: 3px;
`;
const RightCorner = styled.div`
  text-align: right;
`;
const Title = styled.h2`
  margin-top: 10px;
  color: #6b7382;
`;
const Link = styled.a`
  &:hover {
    text-decoration: none;
  }
`;
export default class ListingItem extends React.Component {
  constructor(props) {
    super(props);
  }
  currencyFormat = num => {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
  };
  isOpportunity = listing => {
    return listing.square_meter_price < listing.avg_square_meter_price;
  };
  render() {
    var settings = {
      dots: true,
      //fade: true,
      speed: 3000,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoad: true
    };
    moment.locale("fr");
    return (
      <ItemContainer className="row" isNew={this.props.listing.is_new}>
        <PictureContainer className="col-sm-2">
          <Slider {...settings}>
            {this.props.listing.pictures &&
              this.props.listing.pictures.length > 0 &&
              this.props.listing.pictures.map((picture, index) => {
                return <Picture key={index} src={picture} />;
              })}
          </Slider>
        </PictureContainer>
        <InfoContainer className="col-sm-10">
          {/* <RightCorner>
            <p>{moment(this.props.first_publication_date).format("Do MMM")}</p>
          </RightCorner> */}
          <Link href={this.props.listing.url} target="_blank">
            <Title>{this.props.listing.subject} </Title>
          </Link>

          <p>
            <SquareMeterPrice>
              <span className="badge badge-success">
                {this.currencyFormat(this.props.listing.square_meter_price)}{" "}
                €/m2
              </span>{" "}
            </SquareMeterPrice>
            <span className="badge badge-danger">
              {" "}
              {this.currencyFormat(this.props.listing.price)} €
            </span>{" "}
            <span className="badge badge-secondary">
              {this.props.listing.surface}m2
            </span>{" "}
            <span className="badge badge-info">
              {" "}
              {this.props.listing.postal_code} ~{" "}
              {this.props.listing.avg_square_meter_price} €/m2{" "}
            </span>{" "}
            <span className="badge badge-warning">
              {this.props.listing.external_provider.toUpperCase()}
            </span>{" "}
            <span className="badge badge-primary">
              {moment(this.props.listing.first_publication_date).format("lll")}
            </span>{" "}
            {this.isOpportunity(this.props.listing) && (
              <span className="badge badge-success">Opportunité</span>
            )}
            {/* <span className="badge badge-primary">
              {" "}
              {this.props.listing.id}{" "}
            </span>{" "} */}
          </p>
          <p>{this.props.listing.body.substring(0, 430)}</p>
        </InfoContainer>
      </ItemContainer>
    );
  }
}

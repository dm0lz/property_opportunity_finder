import React from "react";
import axios from "axios";
import ListingItem from "components/listingItem";
import ReactPaginate from "react-paginate";
import styled from "styled-components";

const TotalCount = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
`;
export default class ListingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      listingsCount: 0
    };
  }
  async componentDidMount() {
    const res = await this.fetchListing(0);
    this.setState({
      listings: res.data.results,
      listingsCount: res.data.listings_count
    });
  }
  fetchListing = async pageNb => {
    return await axios.get(`/api/listings?page=${pageNb}`);
  };
  handlePageClick = async e => {
    const pageNb = e.selected + 1;
    const res = await this.fetchListing(pageNb);
    this.setState({ listings: res.data.results });
    window.scrollTo(0, 0);
  };
  render() {
    const pageCount = Math.round(this.state.listingsCount / 25);
    return (
      <div>
        <TotalCount>{this.state.listingsCount} Annonces</TotalCount>
        {this.state.listings.map((item, index) => (
          <ListingItem key={index} listing={item}></ListingItem>
        ))}
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    );
  }
}

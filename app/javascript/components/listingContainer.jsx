import React from "react";
import axios from "axios";
import ListingItem from "components/listingItem";
import ReactPaginate from "react-paginate";
import styled from "styled-components";

const TotalCount = styled.span`
  position: absolute;
  top: 7px;
  right: 7px;
`;
const RefreshButton = styled.button`
  position: absolute;
  top: 7px;
  left: 7px;
`;

const ResetButton = styled.button`
  position: absolute;
  top: 7px;
  left: 147px;
`;
const Container = styled.div`
  margin-top: 20px;
`;
const CtaWrapper = styled.div`
  margin-bottom: 50px;
`;
const SortListingSelect = styled.span`
  position: absolute;
  top: 7px;
  left: 273px;
  width: 230px;
`;
export default class ListingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      listingsCount: 0,
      pendingRefresh: false,
      pendingReset: false,
      sortBy: "square_meter_price",
      sortOrder: "asc"
    };
  }
  async componentDidMount() {
    const url = new URL(location.href);
    this.setState(
      {
        sortBy: url.searchParams.get("sort_by"),
        sortOrder: url.searchParams.get("sort_order")
      },
      () => this.getListing()
    );
  }
  getListing = async () => {
    const res = await this.fetchListing(0);
    this.setState({
      listings: res.data.results,
      listingsCount: res.data.listings_count
    });
  };
  fetchListing = async pageNb => {
    return await axios.get(
      `/api/listings?page=${pageNb}&sort_by=${this.state.sortBy ||
        "square_meter_price"}&sort_order=${this.state.sortOrder || "asc"}`
    );
  };
  refreshListing = async () => {
    this.setState({ pendingRefresh: true });
    const refreshRes = await axios.get("/api/listings/refresh");
    this.setState({ pendingRefresh: false });
    this.getListing();
  };
  handlePageClick = async e => {
    const pageNb = e.selected + 1;
    const res = await this.fetchListing(pageNb);
    this.setState({ listings: res.data.results });
    window.scrollTo(0, 0);
  };
  resetListing = async () => {
    this.setState({ pendingReset: true });
    const refreshRes = await axios.get("/api/listings/reset");
    this.setState({ pendingReset: false });
    this.getListing();
  };
  sortedListing = listing => {
    return listing.sort((key, value) => {
      return key.price - value.price;
    });
  };
  sortListing = e => {
    console.log(e.target.value);
    const [sortBy, sortOrder] = e.target.value.split(":");
    this.setState({ sortBy, sortOrder }, () => this.getListing());
    const newUrl = `?sort_by=${sortBy}&sort_order=${sortOrder}`;
    this.props.history.push(newUrl);
  };
  render() {
    const pageCount = Math.round(this.state.listingsCount / 25);
    const options = [
      "price:asc",
      "price:desc",
      "square_meter_price:asc",
      "square_meter_price:desc"
    ];
    const currentOptionValue = `${this.state.sortBy}:${this.state.sortOrder}`;
    return (
      <Container className="container-fluid">
        <CtaWrapper>
          <RefreshButton
            className="btn btn-success"
            onClick={this.refreshListing}
            disabled={this.state.pendingRefresh}
          >
            Refresh listing
          </RefreshButton>
          <ResetButton
            className="btn btn-danger"
            onClick={this.resetListing}
            disabled={this.state.pendingReset}
          >
            Reset listing
          </ResetButton>
          <SortListingSelect className="form-group">
            <select
              defaultValue={currentOptionValue}
              onChange={this.sortListing}
              className="form-control"
            >
              {options.map((option, key) => {
                return (
                  <option
                    key={key}
                    selected={option === currentOptionValue}
                    value={option}
                  >
                    {option.split(":").join(": ")}
                  </option>
                );
              })}
            </select>
          </SortListingSelect>
        </CtaWrapper>
        <TotalCount className="badge badge-warning">
          {this.state.listingsCount} Annonces
        </TotalCount>
        {this.state.listings.map((item, index) => (
          <ListingItem key={index} listing={item}></ListingItem>
        ))}
        <nav>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"page-item"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </nav>
      </Container>
    );
  }
}

import React from "react";
import axios from "axios";
import ListingItem from "components/listingItem";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import Select from "react-select";

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
const ZipcodeSelectionWrapper = styled.span`
  display: inline-flex;
  position: absolute;
  top: 7px;
  left: 514px;
`;
export default class ListingContainer extends React.Component {
  constructor(props) {
    super(props);
    const zipcodeOptions = [
      { value: "69001", label: "1er" },
      { value: "69002", label: "2eme" },
      { value: "69003", label: "3eme" },
      { value: "69004", label: "4eme" },
      { value: "69005", label: "5eme" },
      { value: "69006", label: "6eme" },
      { value: "69007", label: "7eme" },
      { value: "69008", label: "8eme" },
      { value: "69009", label: "9eme" }
    ];
    this.state = {
      listings: [],
      listingsCount: 0,
      pendingRefresh: false,
      pendingReset: false,
      sortBy: "square_meter_price",
      sortOrder: "asc",
      zipcodeOptions: zipcodeOptions,
      selectedZipcodeOptions: zipcodeOptions
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
        "square_meter_price"}&sort_order=${this.state.sortOrder ||
        "asc"}&zipcodes=${this.state.selectedZipcodeOptions.map(
        zipcode => zipcode.value
      )}`
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
  handleZipcodeChange = e => {
    this.setState({ selectedZipcodeOptions: e }, () => this.getListing());
  };
  render() {
    const pageCount = Math.round(this.state.listingsCount / 25);
    const options = [
      "square_meter_price:asc",
      "square_meter_price:desc",
      "price:asc",
      "price:desc",
      "surface:asc",
      "surface:desc",
      "first_publication_date:asc",
      "first_publication_date:desc"
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
          <ZipcodeSelectionWrapper>
            <Select
              className="zipcode-select"
              style={{
                width: "150px"
              }}
              value={this.state.selectedZipcodeOptions}
              onChange={this.handleZipcodeChange}
              isMulti={true}
              options={this.state.zipcodeOptions}
            />
          </ZipcodeSelectionWrapper>
        </CtaWrapper>
        <TotalCount className="badge badge-warning">
          {this.state.listingsCount} Annonces
        </TotalCount>
        {this.state.listings.map((item, index) => (
          <ListingItem key={index} listing={item}></ListingItem>
        ))}
        <nav>
          {this.state.listings.length > 0 && (
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
          )}
        </nav>
      </Container>
    );
  }
}

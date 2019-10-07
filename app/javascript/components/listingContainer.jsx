import React from "react";
import axios from "axios";
import ListingItem from "components/listingItem";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import MultiSelect from "@khanacademy/react-multi-select";

import RangeSlider from "components/rangeSlider";
import moment from "moment";

const ZIPCODE_OPTIONS = [
  { value: "69001", label: "69001" },
  { value: "69002", label: "69002" },
  { value: "69003", label: "69003" },
  { value: "69004", label: "69004" },
  { value: "69005", label: "69005" },
  { value: "69006", label: "69006" },
  { value: "69007", label: "69007" },
  { value: "69008", label: "69008" },
  { value: "69009", label: "69009" }
];
const TotalCount = styled.span`
  position: absolute;
  top: 7px;
  right: 7px;
  color: #6f7173 !important;
`;
const CurrentDay = styled.span`
  position: absolute;
  top: 33px;
  right: 7px;
  color: #6f7173 !important;
`;
const RefreshButton = styled.button`
  position: absolute;
  top: 7px;
  left: 7px;
`;

const ResetButton = styled.button`
  position: absolute;
  top: 7px;
  left: 197px;
`;
const Container = styled.div`
  margin-top: 60px;
`;
const CtaWrapper = styled.div`
  position: fixed;
  top: 0px;
  z-index: 999999;
  background-color: #699198;
  width: 100%;
`;
const SortListingSelect = styled.span`
  position: absolute;
  top: 10px;
  right: 110px;
  width: 210px;
`;
const ZipcodeSelectionWrapper = styled.span`
  display: inline-flex;
  position: absolute;
  top: 11px;
  left: 225px;
`;
const RangeSliderWrapper = styled.span`
  position: relative;
  left: 450px;
  bottom: 0px;
`;

const CitySelectionWrapper = styled.span`
  position: absolute;
  top: 10px;
  left: 14px;
  width: 200px;
`;

export default class ListingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      listingsCount: 0,
      pendingRefresh: false,
      pendingReset: false,
      sortBy: "first_publication_date",
      sortOrder: "desc",
      zipcodeOptions: [],
      startPrice: 50000,
      endPrice: 190000,
      selectedZipcodeOptions: [],
      city: "lyon"
    };
  }
  async componentDidMount() {
    const url = new URL(location.href);
    const zipcodes = url.searchParams.get("zipcodes");
    const cityParam = url.searchParams.get("city") || this.state.city;
    const zipcodesInUrl = zipcodes === null ? [] : zipcodes.split(",");
    const res = await axios.get(
      `/api/cities?city_name=${cityParam || this.state.city}`
    );
    // todo: select the city properly
    // const city = res.data.results[res.data.results.length - 1];
    let city = res.data.results.map(city => {
      if (city.value === cityParam.toUpperCase()) {
        return city;
      }
    });
    city = city.filter(city => city);
    city = city[0];
    this.setState(
      {
        sortBy: url.searchParams.get("sort_by") || this.state.sortBy,
        sortOrder: url.searchParams.get("sort_order") || this.state.sortOrder,
        startPrice:
          url.searchParams.get("start_price") || this.state.startPrice,
        endPrice: url.searchParams.get("end_price") || this.state.endPrice,
        selectedZipcodeOptions: zipcodesInUrl.length
          ? zipcodesInUrl
          : city.zipcodes,
        zipcodeOptions: city.zipcodes.map(zip => {
          return { value: zip, label: zip };
        })
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
        "first_publication_date"}&sort_order=${this.state.sortOrder ||
        "desc"}&zipcodes=${this.state.selectedZipcodeOptions}&start_price=${
        this.state.startPrice
      }&end_price=${this.state.endPrice}`
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
    console.log(e);
    const [sortBy, sortOrder] = e.value.split(":");
    this.setState({ sortBy, sortOrder }, () => this.updateUrl());
  };
  handleZipcodeChange = e => {
    this.setState({ selectedZipcodeOptions: e }, () => this.updateUrl());
  };
  handleRangeChange = values => {
    const [startPrice, endPrice] = values;
    this.setState({ startPrice, endPrice }, () => this.updateUrl());
  };
  updateUrl = () => {
    const currentSearch = this.props.history.location.search;
    const url = `?city=${this.state.city.toUpperCase()}&sort_by=${this.state
      .sortBy || "first_publication_date"}&sort_order=${this.state.sortOrder ||
      "desc"}&zipcodes=${this.state.selectedZipcodeOptions}&start_price=${
      this.state.startPrice
    }&end_price=${this.state.endPrice}`;

    this.props.history.push(url);
    this.getListing();
  };
  handleCityInputChange = e => {
    //console.log(e);
  };
  async getOptions(inputValue) {
    if (!inputValue || inputValue.length <= 1) {
      return [];
    }
    const response = await fetch(`/api/cities?city_name=${inputValue}`);
    const json = await response.json();
    return json.results;
  }
  handleCitySelected = e => {
    const zipcodeOptions = e.zipcodes.map(zip => {
      return { value: zip, label: zip };
    });
    this.setState(
      { selectedZipcodeOptions: e.zipcodes, zipcodeOptions, city: e.value },
      () => this.updateUrl()
    );
  };
  render() {
    const pageCount = Math.round(this.state.listingsCount / 25);
    const options = [
      { label: "prix au m2 croissant", value: "square_meter_price:asc" },
      { label: "prix au m2 décroissant", value: "square_meter_price:desc" },
      { label: "prix croissant", value: "price:asc" },
      { label: "prix décroissant", value: "price:desc" },
      { label: "surface croissante", value: "surface:asc" },
      { label: "surface décroissante", value: "surface:desc" },
      { label: "date croissante", value: "first_publication_date:asc" },
      { label: "date décroissante", value: "first_publication_date:desc" }
    ];
    const currentOptionValue = options.find(
      el => el.value === `${this.state.sortBy}:${this.state.sortOrder}`
    );
    const zipcodeOptions = this.state.zipcodeOptions.sort(
      (a, b) => a.value - b.value
    );
    return (
      <div>
        <CtaWrapper>
          {/* <RefreshButton
            className="btn btn-success"
            onClick={this.refreshListing}
            disabled={this.state.pendingRefresh}
          >
            Mettre à jour le listing
          </RefreshButton>
          <ResetButton
            className="btn btn-danger"
            onClick={this.resetListing}
            disabled={this.state.pendingReset}
          >
            Remettre à zéro le listing
          </ResetButton> */}
          <CitySelectionWrapper>
            <AsyncSelect
              cacheOptions
              loadOptions={this.getOptions}
              defaultOptions
              onInputChange={this.handleCityInputChange}
              onChange={this.handleCitySelected}
              placeholder="Chercher une Ville"
              noOptionsMessage={() => "Pas de résultat"}
            />
          </CitySelectionWrapper>

          <ZipcodeSelectionWrapper>
            {/* <Select
              className="zipcode-select"
              style={{
                width: "150px"
              }}
              value={this.state.selectedZipcodeOptions}
              onChange={this.handleZipcodeChange}
              isMulti={true}
              options={this.state.zipcodeOptions}
            /> */}
            <MultiSelect
              options={zipcodeOptions}
              selected={this.state.selectedZipcodeOptions}
              onSelectedChanged={this.handleZipcodeChange}
              overrideStrings={{
                selectSomeItems: "Select Some items...",
                allItemsAreSelected: "Tous les codes postaux",
                selectAll: "Tous",
                search: "Chercher"
              }}
            />
          </ZipcodeSelectionWrapper>
          <RangeSliderWrapper>
            <RangeSlider
              onRangeChange={this.handleRangeChange}
              startPrice={this.state.startPrice}
              endPrice={this.state.endPrice}
            />
          </RangeSliderWrapper>
          <TotalCount className="badge badge-warning">
            {this.state.listingsCount} Annonces
          </TotalCount>
          <CurrentDay className="badge badge-warning">
            {moment(new Date()).format("ll")}
          </CurrentDay>
          <SortListingSelect className="form-group">
            <Select
              value={currentOptionValue}
              onChange={this.sortListing}
              isMulti={false}
              options={options}
            />
          </SortListingSelect>
        </CtaWrapper>
        <Container className="container-fluid">
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
      </div>
    );
  }
}

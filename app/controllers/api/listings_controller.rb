class Api::ListingsController < ApplicationController

  def index
    @listings = Listing.where('square_meter_price >= 2800')
      .where(junk: false)
      .where(postal_code: params[:zipcodes].split(','))
      .where.not(real_estate_type: 'parking')
      .where("first_publication_date >= :date", date: DateTime.current - 30.days)
      .order("#{params[:sort_by]} #{params[:sort_order].upcase}")
    @listing_count = @listings.count
    @listings = @listings.page(params[:page]).per(25)

    render 'api/listings/index.json'
  end
  def refresh
    Importer::Seloger::Properties.new.perform
    Importer::Leboncoin::Properties.new.perform
    head :ok
  end
  def reset
    Listing.destroy_all
    head :ok
  end

end

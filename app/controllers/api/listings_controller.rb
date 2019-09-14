class Api::ListingsController < ApplicationController
  def index
    @listings = Listing.where('square_meter_price >= 2800')
      .where.not(real_estate_type: 'parking')
      .where("first_publication_date >= :date", date: DateTime.current - 5.days)
      .order(square_meter_price: :asc)
      .page(params[:page]).per(25)

    render 'api/listings/index.json'
  end
end

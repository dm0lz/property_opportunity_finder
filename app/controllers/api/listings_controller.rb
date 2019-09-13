class Api::ListingsController < ApplicationController
  def index
    render json: Listing.where('square_meter_price >= 2800')
      .where.not(real_estate_type: 'parking')
      .order(square_meter_price: :asc)
      .page(params[:page]).per(25)
  end
end

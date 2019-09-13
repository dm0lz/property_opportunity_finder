class Listing < ApplicationRecord
  before_save :set_square_meter_price

  protected
  def set_square_meter_price
    return nil unless surface
    self.square_meter_price = (price / surface).round
  end
end

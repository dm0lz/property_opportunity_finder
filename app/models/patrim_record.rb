class PatrimRecord < ApplicationRecord
  before_save :set_square_meter_price
  validates :price, :surface, :postal_code, presence: true

  protected
  def set_square_meter_price
    return nil unless surface
    self.square_meter_price = (price / surface).round
  end
end

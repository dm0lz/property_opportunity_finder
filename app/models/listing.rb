class Listing < ApplicationRecord
  before_save :set_square_meter_price
  before_save :check_junk

  protected
  def set_square_meter_price
    return nil unless surface
    self.square_meter_price = (price / surface).round
  end
  def check_junk
    %w(senior étudiante SENIOR ETUDIANTE etudiante).each do |keyword|
      self.junk = true if self.body.include?(keyword) || self.subject.include?(keyword)
    end
  end
end

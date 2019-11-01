class Listing < ApplicationRecord

  before_save :set_square_meter_price
  before_save :check_junk

  %w(leboncoin seloger bienici).each do |provider|
    scope provider.to_sym, -> { where(external_provider: provider) }
  end

  def avg_area_price
    listings = Listing.where(postal_code: postal_code, junk: false)
    listings.sum(:square_meter_price) / listings.count
  end

  def clean
    OpenStruct.new self.attributes.except("original_payload")
  end

  protected

  def set_square_meter_price
    return nil unless surface
    self.square_meter_price = (price / surface).round
  end

  def check_junk
    %w(senior étudiante SENIOR ETUDIANTE etudiante EHPAD viager).each do |keyword|
      self.junk = true if self.body.include?(keyword) || self.subject.include?(keyword)
    end
  end

end

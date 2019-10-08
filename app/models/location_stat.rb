class LocationStat < ApplicationRecord
end

# (69001..69009).to_a.each do |zip|
#   avg = get_avg(zip)
#   LocationStat.create(postal_code: zip, average_square_meter_price: avg)
# end

# def get_avg(postal_code)
#   listings = Listing.where(postal_code: postal_code, junk: false)
#   listings.sum(:square_meter_price) / listings.count
# end
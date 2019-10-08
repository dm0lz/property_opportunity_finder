json.listings_count @listing_count
json.results @listings do |listing|
  json.is_new listing.first_publication_date.today?
  json.avg_square_meter_price listing.avg_area_price rescue nil
  json.merge! listing.attributes
end
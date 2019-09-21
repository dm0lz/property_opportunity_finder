json.listings_count @listing_count
json.results @listings do |listing|
  json.is_new listing.first_publication_date.today?
  json.merge! listing.attributes
end
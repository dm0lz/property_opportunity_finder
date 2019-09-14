json.listings_count @listings.count
json.results @listings do |listing|
  json.is_new listing.first_publication_date.today?
  json.merge! listing.attributes
end
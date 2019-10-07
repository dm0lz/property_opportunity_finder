json.results @cities do |city|
  json.label city.city_name
  json.value city.city_name
  json.zipcodes city.zipcodes
end
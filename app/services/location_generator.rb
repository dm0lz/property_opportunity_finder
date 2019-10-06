class LocationGenerator
  def perform
    Location.transaction do
      InseeLocation.all.find_each do |insee_location|
        location = Location.find_or_initialize_by(city_name: insee_location.name)
        zipcode_arr = location.zipcodes
        if zipcode_arr.any?
          departement = zipcode_arr.first[0..1]
          unless zipcode_arr.include?(insee_location.postal_code.to_s)
            zipcode_arr << insee_location.postal_code if departement == insee_location.postal_code.to_s[0..1]
          end
        else
          zipcode_arr << insee_location.postal_code
        end
        location.zipcodes = zipcode_arr
        location.save
      end
    end
  end
end
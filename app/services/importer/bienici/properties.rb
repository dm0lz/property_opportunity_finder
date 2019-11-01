class Importer::Bienici::Properties
  def perform
    response = Fetcher::Bienici::Properties.new.perform
    json_properties = JSON.parse response
    properties = json_properties["realEstateAds"]
    properties.each do |property|
      Persister::Bienici::Properties.new(property).perform
    end
  end
end
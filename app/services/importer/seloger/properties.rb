class Importer::Seloger::Properties
  def perform
    options = {}
    options[:postal_codes] = ["69001", "69002", "69003", "69006", "69007"]
    (1..2).to_a.each do |page_nb|
      xml_properties = Fetcher::Seloger::Properties.new(options).perform(page_nb)
      json_properties = JSON.parse Hash.from_xml(xml_properties).to_json
      properties = json_properties["recherche"]["annonces"]["annonce"]
      properties.each do |property|
        Persister::Seloger::Properties.new(property).perform
      end
    end
  end
end
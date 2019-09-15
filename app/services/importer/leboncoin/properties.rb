class Importer::Leboncoin::Properties
  def perform
    options = {}
    options[:postal_codes] = ["69001", "69002", "69003", "69006", "69007"]
    begin
      count = 0
      properties = Fetcher::Leboncoin::Properties.new(options).perform
    rescue => Net::ReadTimeout
      count += count
      retry if count < 5
    end
    properties.each do |property|
      Persister::Leboncoin::Properties.new(property).perform
    end
  end
end
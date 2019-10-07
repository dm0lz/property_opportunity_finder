class Persister::Leboncoin::Properties

  def initialize(property)
    @property = property
  end
  attr_reader :property

  def perform
    # begin
      content = {
        external_id: property['list_id'],
        first_publication_date: property['first_publication_date'],
        index_date: property['index_date'],
        status: property['status'],
        category_id: property['category_id'],
        category_name: property['category_name'],
        subject: property['subject'],
        body: property['body'],
        ad_type: property['ad_type'],
        url: property['url'],
        price: property['price'].first rescue 0,
        surface: retrieve_surface(property),
        postal_code: property["location"]["zipcode"],
        pictures: property["images"]["urls_thumb"],
        external_provider: 'leboncoin',
        real_estate_type: retrieve_real_estate_type(property),
        original_payload: property
      }
      listing = Listing.find_or_initialize_by(external_id: property['list_id'])
      listing.update(content)
      listing.save!
    # rescue => e
    #   puts e
    # end
  end

  def retrieve_real_estate_type(property)
    real_estate_attribute = property['attributes'].select{|l| l["key"] == 'real_estate_type'}
    return "unknown" if real_estate_attribute.empty?
    real_estate_attribute.first['value_label'].downcase
  end

  def retrieve_surface(property)
    property['attributes'].select{|l| l["key"] == 'square'}.first['value'] rescue nil
  end
end
class Persister::Bienici::Properties

    def initialize(property)
      @property = property
    end
    attr_reader :property
  
    def perform
      content = {
        external_id: property['id'],
        first_publication_date: property['modificationDate'],
        index_date: property['modificationDate'],
        #status: property['status'],
        #category_id: property['category_id'],
        #category_name: property['category_name'],
        subject: property['title'].present? ? property['title'] : 'Appartement',
        body: property['description'],
        ad_type: property['adTypeFR'],
        url: property['permaLien'],
        price: property['price'],
        surface: property['surfaceArea'],
        postal_code: property["district"]["postal_code"],
        pictures: retrieve_pictures(property),
        external_provider: 'bienici',
        real_estate_type: property["propertyType"],
        original_payload: property
      }
      listing = Listing.find_or_initialize_by(external_id: property['id'])
      listing.update(content)
      listing.save!
    end
  
    def retrieve_pictures(property)
      return [] unless property["photos"].length
      begin
        property['photos'].map{|l| l["url_photo"]}
      rescue => e
        binding.pry
      end
    end
  
  
  end
class Persister::Seloger::Properties

  def initialize(property)
    @property = property
  end
  attr_reader :property

  def perform
    content = {
      external_id: property['idAnnonce'],
      first_publication_date: property['dtCreation'],
      index_date: property['dtFraicheur'],
      #status: property['status'],
      #category_id: property['category_id'],
      #category_name: property['category_name'],
      subject: property['libelle'],
      body: property['descriptif'],
      #ad_type: property['ad_type'],
      url: property['permaLien'],
      price: property['prix'],
      surface: property['surface'],
      postal_code: property["cp"],
      pictures: retrieve_pictures(property),
      external_provider: 'seloger',
      real_estate_type: property["typeDPE"],
      original_payload: property
    }
    listing = Listing.find_or_initialize_by(external_id: property['idAnnonce'])
    listing.update(content)
    listing.save!
  end

  def retrieve_pictures(property)
    return [] unless property["photos"]["photo"]
    begin
    return property["photos"]["photo"]["thbUrl"] if property["photos"]["photo"].is_a?(Hash)
    property["photos"]["photo"].map{|l| l["thbUrl"]}
    rescue => e
      binding.pry
    end
  end


end
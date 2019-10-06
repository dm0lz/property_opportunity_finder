require 'csv'
class InseeLocationImporter
  def perform
    csv = File.read('/Users/olivier/Downloads/laposte_hexasmal.csv')
    CSV.parse(csv, :headers => true) do |row|
      data_array = row["Code_commune_INSEE;Nom_commune;Code_postal;Libelle_acheminement;Ligne_5;coordonnees_gps"].split(';')
      insee_location = InseeLocation.create(insee_code: data_array[0], postal_code: data_array[2], name: data_array[3])
    end
  end
end
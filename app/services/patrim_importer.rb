require 'csv'
class PatrimImporter
  def perform
    file = File.join(Rails.root, 'public', 'patrim.txt')
    File.readlines(file).each do |line|
      row = line.split('|')
      if row[36] == "Appartement" && row[17].include?('LYON')
        begin
        PatrimRecord.create(postal_code: row[16], price: row[10], surface: retrieve_surface(row))
        rescue => e 
          binding.pry
        end
      end
    end
  end
  def retrieve_surface(row)
    [row[25], row[27], row[29]].each do |surface|
      return surface unless surface.blank?
      return nil
    end
  end
end
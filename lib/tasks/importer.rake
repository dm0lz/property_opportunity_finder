desc "Import new ads"
task importer: :environment do
  Importer::Seloger::Properties.new.perform
  Importer::Leboncoin::Properties.new.perform
  puts "Done !"
end

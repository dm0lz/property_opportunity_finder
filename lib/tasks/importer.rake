desc "Import new ads"
task importer: :environment do
  puts "Importing..."
  puts "Se Loger"
  Importer::Seloger::Properties.new.perform
  puts "Leboncoin"
  Importer::Leboncoin::Properties.new.perform
  puts "Done !"
end

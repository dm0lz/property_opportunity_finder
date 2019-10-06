class CreateLocations < ActiveRecord::Migration[6.0]
  def change
    create_table :locations do |t|
      t.string :city_name
      t.text :zipcodes, array: true, default: []

      t.timestamps
    end
  end
end

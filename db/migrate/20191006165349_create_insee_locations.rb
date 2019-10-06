class CreateInseeLocations < ActiveRecord::Migration[6.0]
  def change
    create_table :insee_locations do |t|
      t.string :insee_code
      t.integer :postal_code
      t.string :name

      t.timestamps
    end
  end
end

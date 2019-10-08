class CreatePatrimRecords < ActiveRecord::Migration[6.0]
  def change
    create_table :patrim_records do |t|
      t.integer :price
      t.integer :square_meter_price
      t.string :postal_code
      t.float :surface

      t.timestamps
    end
  end
end

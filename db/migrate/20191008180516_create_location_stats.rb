class CreateLocationStats < ActiveRecord::Migration[6.0]
  def change
    create_table :location_stats do |t|
      t.string :postal_code
      t.integer :average_square_meter_price

      t.timestamps
    end
  end
end

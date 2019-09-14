class CreateListings < ActiveRecord::Migration[6.0]
  def change
    create_table :listings do |t|
      t.integer :external_id
      t.datetime :first_publication_date
      t.datetime :index_date
      t.string :status
      t.integer :category_id
      t.string :category_name
      t.string :subject
      t.text :body
      t.string :ad_type
      t.string :url
      t.integer :price
      t.float :surface
      t.integer :floor
      t.string :postal_code
      t.integer :square_meter_price
      t.text :pictures, array: true, default: []
      t.string :external_provider
      t.string :real_estate_type
      t.boolean :junk, default: false
      t.jsonb :original_payload

      t.timestamps
    end
  end
end

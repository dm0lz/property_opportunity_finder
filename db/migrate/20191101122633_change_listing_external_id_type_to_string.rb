class ChangeListingExternalIdTypeToString < ActiveRecord::Migration[6.0]
  def change
    change_column :listings, :external_id, :string
  end
end

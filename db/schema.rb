# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_09_12_161507) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "listings", force: :cascade do |t|
    t.integer "external_id"
    t.datetime "first_publication_date"
    t.datetime "index_date"
    t.string "status"
    t.integer "category_id"
    t.string "category_name"
    t.string "subject"
    t.text "body"
    t.string "ad_type"
    t.string "url"
    t.integer "price"
    t.float "surface"
    t.integer "floor"
    t.string "postal_code"
    t.integer "square_meter_price"
    t.text "pictures", default: [], array: true
    t.string "external_provider"
    t.string "real_estate_type"
    t.jsonb "original_payload"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end

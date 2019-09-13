class Fetcher::Leboncoin::Properties
  def initialize(options = {})
  end
  def perform
    payload = {"filters":{"category":{"id":"9"},"enums":{"ad_type":["offer"]},"keywords":{},"location":{"locations":[{"locationType":"city","label":"Lyon (69007)","city":"Lyon","zipcode":"69007","department_id":"69","region_id":"22","area":{"lat":45.73746,"lng":4.84005,"default_radius":3349}},{"locationType":"city","label":"Lyon (69006)","city":"Lyon","zipcode":"69006","department_id":"69","region_id":"22","area":{"lat":45.77496,"lng":4.85511,"default_radius":1695}},{"locationType":"city","label":"Lyon (69003)","city":"Lyon","zipcode":"69003","department_id":"69","region_id":"22","area":{"lat":45.75141,"lng":4.87592,"default_radius":3130}},{"locationType":"city","label":"Lyon (69002)","city":"Lyon","zipcode":"69002","department_id":"69","region_id":"22","area":{"lat":45.75943,"lng":4.82886,"default_radius":6304}},{"locationType":"city","label":"Lyon (69001)","city":"Lyon","zipcode":"69001","department_id":"69","region_id":"22","area":{"lat":45.76964,"lng":4.82623,"default_radius":1164}}]},"ranges":{"price":{"max":200000},"square":{"min":20}}},"limit":200,"limit_alu":0}
    url = 'https://api.leboncoin.fr/finder/search'
    response = Faraday.post(url, payload.to_json, "Content-Type" => "application/json")
    content = JSON.parse(response.body)
    content["ads"]
  end
end
class Fetcher::Leboncoin::Properties
  def initialize(options = {})
  end
  def perform
    payload = {"limit":550,"limit_alu":3,"filters":{"category":{"id":"9"},"enums":{"ad_type":["offer"]},"location":{"locations":[{"locationType":"city","label":"Lyon (toute la ville)","city":"Lyon","department_id":"69","region_id":"22","area":{"lat":45.76071825414269,"lng":4.836251707178035,"default_radius":7600}}]},"keywords":{},"ranges":{"price":{"max":225000}}},"user_id":"bb0992e2-da82-4a98-82c1-99326b835546","store_id":"1271906"}
    url = 'https://api.leboncoin.fr/finder/search'
    conn = Faraday.new('https://api.leboncoin.fr', proxy: 'http://163.172.190.160:8811')
    response = conn.post('/finder/search', payload.to_json, "Content-Type" => "application/json")
    #response = Faraday.post(url, payload.to_json, "Content-Type" => "application/json")
    content = JSON.parse(response.body)
    content["ads"]
  end
end

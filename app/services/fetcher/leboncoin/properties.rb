class Fetcher::Leboncoin::Properties
  def initialize(options = {})
  end
  def perform
    # payload = {"limit":550,"limit_alu":3,"filters":{"category":{"id":"9"},"enums":{"ad_type":["offer"]},"location":{"locations":[{"locationType":"city","label":"Lyon (toute la ville)","city":"Lyon","department_id":"69","region_id":"22","area":{"lat":45.76071825414269,"lng":4.836251707178035,"default_radius":7600}}]},"keywords":{},"ranges":{"price":{"max":225000}}},"user_id":"bb0992e2-da82-4a98-82c1-99326b835546","store_id":"1271906"}
    payload = {"limit":0,"limit_alu":0,"filters":{"category":{"id":"9"},"enums":{"ad_type":["offer"]},"location":{"locations":[{"locationType":"city","label":"Lyon (69009)","city":"Lyon","zipcode":"69009","department_id":"69","region_id":"22","area":{"lat":45.78348,"lng":4.80146,"default_radius":3897}},{"locationType":"city","label":"Lyon (69008)","city":"Lyon","zipcode":"69008","department_id":"69","region_id":"22","area":{"lat":45.73411,"lng":4.86908,"default_radius":2381}},{"locationType":"city","label":"Lyon (69007)","city":"Lyon","zipcode":"69007","department_id":"69","region_id":"22","area":{"lat":45.73746,"lng":4.84005,"default_radius":3349}},{"locationType":"city","label":"Lyon (69006)","city":"Lyon","zipcode":"69006","department_id":"69","region_id":"22","area":{"lat":45.77496,"lng":4.85511,"default_radius":1695}},{"locationType":"city","label":"Lyon (69005)","city":"Lyon","zipcode":"69005","department_id":"69","region_id":"22","area":{"lat":45.75594,"lng":4.80342,"default_radius":2519}},{"locationType":"city","label":"Lyon (69004)","city":"Lyon","zipcode":"69004","department_id":"69","region_id":"22","area":{"lat":45.78001,"lng":4.8261,"default_radius":1438}},{"locationType":"city","label":"Lyon (69003)","city":"Lyon","zipcode":"69003","department_id":"69","region_id":"22","area":{"lat":45.75141,"lng":4.87592,"default_radius":3130}},{"locationType":"city","label":"Lyon (69002)","city":"Lyon","zipcode":"69002","department_id":"69","region_id":"22","area":{"lat":45.75943,"lng":4.82886,"default_radius":6304}},{"locationType":"city","label":"Lyon (69001)","city":"Lyon","zipcode":"69001","department_id":"69","region_id":"22","area":{"lat":45.76964,"lng":4.82623,"default_radius":1164}}]},"keywords":{},"ranges":{"price":{"max":225000}}}}
    url = 'https://api.leboncoin.fr/finder/search'
    conn = Faraday.new('https://api.leboncoin.fr', proxy: 'http://163.172.190.160:8811')
    response = conn.post('/finder/search', payload.to_json, "Content-Type" => "application/json")
    #response = Faraday.post(url, payload.to_json, "Content-Type" => "application/json")
    content = JSON.parse(response.body)
    content["ads"]
  end
end

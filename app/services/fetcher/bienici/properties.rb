class Fetcher::Bienici::Properties
    def perform
      url = 'https://www.bienici.com/realEstateAds.json?filters=%7B%22size%22%3A24%2C%22from%22%3A0%2C%22filterType%22%3A%22buy%22%2C%22propertyType%22%3A%5B%22house%22%2C%22flat%22%5D%2C%22maxPrice%22%3A600000%2C%22newProperty%22%3Afalse%2C%22page%22%3A1%2C%22resultsPerPage%22%3A600%2C%22maxAuthorizedResults%22%3A2400%2C%22sortBy%22%3A%22relevance%22%2C%22sortOrder%22%3A%22desc%22%2C%22onTheMarket%22%3A%5Btrue%5D%2C%22limit%22%3A%22woqvGc%60qY%3Fms%7BDz%7BQnA%3Fjn%7BD%22%2C%22showAllModels%22%3Afalse%2C%22blurInfoType%22%3A%5B%22disk%22%2C%22exact%22%5D%2C%22zoneIdsByTypes%22%3A%7B%22zoneIds%22%3A%5B%22-10690%22%2C%22-10680%22%2C%22-120967%22%2C%22-18510%22%2C%22-10688%22%2C%22-10679%22%2C%22-10682%22%2C%22-10686%22%2C%22-120966%22%5D%7D%7D&extensionType=extendedIfNoResult&access_token=E%2BJfKKx%2BGpcnbJt8wGqU7YBWszo0dVfJToyCe2uqQss%3D%3A5d9b9e3204a380014e1af585&id=5d9b9e3204a380014e1af585'
      response = Faraday.get(url)
      response.body
    end
  end
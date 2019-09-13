class Fetcher::Seloger::Properties
  def initialize(options = {})
  end
  def perform(page_nb)
    url = "http://ws-seloger.svc.groupe-seloger.com/search.xml?idtt=2&ci=690381,690382,690383,690386,690387&pxmax=200000&SEARCHpg=#{page_nb}"
    response = Faraday.get(url)
    response.body
  end
end
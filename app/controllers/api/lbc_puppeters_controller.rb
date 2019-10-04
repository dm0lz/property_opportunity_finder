class Api::LbcPuppetersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    payload = params.to_unsafe_h[:lbc_puppeter]
    head 422 and return if payload.keys.include?('url')
    ads_array = payload[:ads]
    ads_array.each do |item|
      Persister::Leboncoin::Properties.new(item).perform
    end
    head 200
  end

end

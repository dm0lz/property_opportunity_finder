class Api::CitiesController < ApplicationController
  
  def index
   @cities = Location.where("city_name ILIKE :city", city: "%#{params[:city_name]}%")   
   render 'api/cities/index.json'
  end
  
end
  
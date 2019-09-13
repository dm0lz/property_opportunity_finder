Rails.application.routes.draw do
  root 'home#index'
  namespace :api do
    resources :listings, only: :index
  end
end

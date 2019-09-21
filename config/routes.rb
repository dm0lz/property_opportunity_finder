Rails.application.routes.draw do
  root 'home#index'
  namespace :api do
    resources :listings, only: :index do
      collection do
        get :refresh
        get :reset
      end
    end
  end
end

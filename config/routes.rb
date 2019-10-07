Rails.application.routes.draw do
  root 'home#index'
  namespace :api do
    resources :listings, only: [:index, :create] do
      collection do
        get :refresh
        get :reset
      end
    end
    resource :lbc_puppeter, only: :create
    resources :cities, only: :index
  end
  get "*path", to: "home#index"
end

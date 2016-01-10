require 'api_constraints'

Rails.application.routes.draw do

  devise_for :users
	namespace :api, defaults: { format: :json }, path: '/'  do
    	scope module: :v1, constraints: ApiConstraints.new(version: 1, default: true) do

    		resources :events, only: [:index, :show, :create, :update, :destroy] do
    			resources :playlists, only: [:index, :create, :destroy]
    		end

        resources :bookings, only: :create

    	end
  	end

  	root 'application#index'
	get '*path' => 'application#index'
  
end

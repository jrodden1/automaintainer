Rails.application.routes.draw do
  resources :vehicles, except: [:new, :edit, :destroy]
  resources :maint_events, only: [:show, :create, :update]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

Blog::Application.routes.draw do


  devise_for :users
  devise_scope :user do
    post 'login' => 'sessions#create', :as => 'login',defaults: {format: :json}
    post 'logout' => 'sessions#destroy', :as => 'logout',defaults: {format: :json}
    get 'current_user' => 'sessions#show_current_user', :as => 'show_current_user',defaults: {format: :json}
  end

  get 'templates/posts', to: 'templates#posts'
  get 'templates/login', to: 'templates#login'
  get 'templates/register', to: 'templates#register'
  get 'templates/about', to: 'templates#about'
  get 'templates/create_post', to: 'templates#create_post'
  get 'templates/post', to: 'templates#post'
  get 'logged_status', to: 'users#is_loggedIn'

  root 'static_pages#index'

  scope :api do
    resources :posts, defaults: {format: :json}
    resources :comments, defaults: {format: :json}
  end





end

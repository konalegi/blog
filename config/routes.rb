Blog::Application.routes.draw do


  devise_for :users
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

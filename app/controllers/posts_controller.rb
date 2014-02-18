class PostsController < ApplicationController
  respond_to :json
  #before_filter :authenticate_user!
  def index

    @posts = Post.all_signed(current_user)
    logger.info "current user: #{current_user}"
    respond_with @posts
  end

  def show

    @post = Post.find(params[:id])
    respond_with @post
  end

  def create
    authenticate_user!
    respond_with Post.create(post_params)
  end

  def destroy
    :authenticate_user!
    respond_with Post.destroy(params[:id])
  end

  private
  def post_params
    :authenticate_user!
    params[:post][:user_id]=current_user.id
    params.require(:post).permit(:title, :text_data, :user_id)
  end

end

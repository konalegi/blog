class CommentsController < ApplicationController
  before_action :set_comment, only: [:show, :edit, :update, :destroy]
  respond_to :json
  # GET /comments
  # GET /comments.json
  def index
    logger.info("comments got index! #{params}");
    @comments = Comment.find_by_post_id(params[:post_id])
    respond_with @comments
  end

  # GET /comments/1
  # GET /comments/1.json
  def show
    logger.info("comments got show! #{params}");
    @comments = Comment.find_by_post_id(params[:post_id])
    respond_with @comments
  end

  # GET /comments/new
  def new
    @comment = Comment.new
  end

  # GET /comments/1/edit
  def edit
  end

  # POST /comments
  # POST /comments.json
  def create
    :authenticate_user!
    @comment = Comment.create!(comment_params)
    respond_with @comment
  end

  def destroy
    :authenticate_user!
    respond_with Comment.destroy(params[:id])
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def comment_params
      params[:comment][:user_id] = current_user.id
      params.require(:comment).permit(:text_data, :post_id, :user_id)
    end
end

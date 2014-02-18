class Post < ActiveRecord::Base
  belongs_to :user
  has_many :comments

  validates :title,:length => { :maximum => 50 }
  validates :text_data,  :length => {:maximum => 1000 }
  validates_presence_of :title,:text_data,:user_id

  def created_at_formatted
    created_at.strftime('%A, %b %d, %Y')
  end

  def self.all_signed(current_user)
    all_posts = all
    post_signed = Array.new
    all_posts.each do |post|
        obj = {}
        if current_user.nil?
          obj[:signed]=false
        else
          obj[:signed]=(post.user_id == current_user.id)
        end
        obj[:id]=post.id
        obj[:title] = post.title
        obj[:text_data] = post.text_data
        obj[:created_at_formatted] = post.created_at_formatted
        obj[:user_name] = post.user.name

        post_signed.push(obj)
      end

    post_signed
  end
end

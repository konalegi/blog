class Comment < ActiveRecord::Base
  belongs_to :user
  def created_at_formatted
    created_at.strftime('%A, %b %d, %Y')
  end

  def as_json(options={})
    {
        :text_data => text_data,
        :user_name => user.name,
        :created_at => created_at_formatted
    }
  end
end

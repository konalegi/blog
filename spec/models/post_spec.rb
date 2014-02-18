require 'spec_helper'

describe Post do
  before do
    @post = Post.new(title:'some title',text_data: 'some sample text data',user_id:1)
  end

  subject { @post }

  it { should respond_to(:title) }
  it { should respond_to(:text_data) }
  it { should respond_to(:user_id) }

  it { should be_valid }

  describe 'when title is not present' do
    before { @post.title = " " }
    it { should_not be_valid }
  end

  describe 'when text_data is not present' do
    before { @post.text_data = " " }
    it { should_not be_valid }
  end

  describe 'when user_id is not present' do
    before { @post.user_id = nil }
    it { should_not be_valid }
  end


end

require 'spec_helper'

describe User do
  before do
    @user = User.new(name: "Djon",surname:"Malkovich",email:"djon.malkovich@mail.ru",birthdate:'1988-10-10',sex:0)
  end

  subject { @user }

  it { should respond_to(:name) }
  it { should respond_to(:surname) }
  it { should respond_to(:email) }
  it { should respond_to(:birthdate) }
  it { should respond_to(:sex) }

  it { should be_valid }

  describe 'when name is not present' do
    before { @user.name = " " }
    it { should_not be_valid }
  end

  describe 'when surnamae is not present' do
    before { @user.surname = " " }
    it { should_not be_valid }
  end

  describe 'when email is not present' do
    before { @user.email = " " }
    it { should_not be_valid }
  end

  describe 'when birthdate is not present' do
    before { @user.birthdate = nil }
    it { should_not be_valid }
  end

  describe 'when sex is not present' do
    before { @user.birthdate = nil }
    it { should_not be_valid }
  end


  describe 'when user already exists' do
    before do
      user_with_same_email = @user.dup
      user_with_same_email.email = @user.email
      user_with_same_email.save
    end

    it { should_not be_valid }
  end


end

require 'spec_helper'

describe "users/new" do
  before(:each) do
    assign(:user, stub_model(User,
      :name => "MyString",
      :surname => "MyString",
      :sex => "",
      :email => "MyString"
    ).as_new_record)
  end

  it "renders new user form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", users_path, "post" do
      assert_select "input#user_name[name=?]", "user[name]"
      assert_select "input#user_surname[name=?]", "user[surname]"
      assert_select "input#user_sex[name=?]", "user[sex]"
      assert_select "input#user_email[name=?]", "user[email]"
    end
  end
end

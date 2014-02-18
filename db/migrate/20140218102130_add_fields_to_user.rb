class AddFieldsToUser < ActiveRecord::Migration
  def change
    add_column :users, :password, :string
    add_column :users, :password_confirmation, :string
    add_column :users, :remember_me, :boolean
  end
end

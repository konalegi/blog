class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable


  has_many :posts

  validates :email,  uniqueness: { case_sensitive: false },:length => { :maximum => 100 },
            :email => true
  validates :name,  :length => {:maximum => 20 }
  validates :surname,  :length => {:maximum => 20 }
  validate :sex, :inclusion => 0..1, allow_nil: false
  validate :birthdate,  date: true
  validates_presence_of :name, :email, :surname, :sex, :birthdate





end

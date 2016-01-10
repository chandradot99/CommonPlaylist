class User < ActiveRecord::Base
  has_one :event, dependent: :destroy
  has_many :bookings
  has_many :events, through: :bookings
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end

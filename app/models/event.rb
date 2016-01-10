class Event < ActiveRecord::Base
	has_many :playlists, dependent: :destroy
	has_many :bookings
	has_many :users, through: :bookings
	belongs_to :user
end

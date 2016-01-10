class Playlist < ActiveRecord::Base
  belongs_to :event
  mount_uploader :file, SongUploader
end

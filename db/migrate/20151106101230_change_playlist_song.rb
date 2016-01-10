class ChangePlaylistSong < ActiveRecord::Migration
  def change
  	rename_column :playlists, :song, :file
  end
end

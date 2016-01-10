class Api::V1::PlaylistsController < ApplicationController

  def index
  	respond_with Playlist.where(event_id: params[:event_id])
  end

  def create
    event = Event.find(params[:event_id])
    file = params[:file]
    playlist = event.playlists.create(file: file, name: file.original_filename)
    render json: event
  end

end

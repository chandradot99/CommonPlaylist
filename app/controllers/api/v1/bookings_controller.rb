class Api::V1::BookingsController < ApplicationController
	def create
		event = Event.find(booking_params[:eventId])
		current_user.events<<event
		render json: event
	end

	def booking_params
		params.require(:book).permit(:eventId)
	end
end

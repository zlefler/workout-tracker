class WorkoutsController < ApplicationController

    def create
        render json: Workout.create(user_id: params[:user_id], date: params[:date]), status: :created
    end

    def show
        render json: Workout.where(user_id: params[:id])
    end

end

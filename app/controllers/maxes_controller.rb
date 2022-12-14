class MaxesController < ApplicationController

    def create
        lift = Lift.find_by(name: params[:lift])
        render json: Max.create(user_id: params[:user_id], lift_id: lift.id, lift_max: params[:lift_max]), status: :created
    end

    def update
        lift = Lift.find_by(name: params[:lift])
        max = Max.where('lift_id = ? and user_id = ?', lift.id, session[:user_id]).first            
        max.update(lift_max: params[:lift_max])
        render json: max, status: :ok
    end


    def index
        render json: Max.where(user_id: session[:user_id]), status: :ok
    end

end

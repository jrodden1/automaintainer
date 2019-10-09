class VehiclesController < ApplicationController
  
  def index
    vehicles = Vehicle.all

    render json: Vehicle.all, include: [:maint_events]
  end

  def create
    vehicle = Vehicle.new(vehicle_params)

    if vehicle.save 
      render json: vehicle, status: 201
    else
      render json: { message: "Error - Missing Data: #{vehicle.error.full_messages.join(", ")}" }, status: 400
    end

  end

  def show
    vehicle = set_vehicle

    if vehicle
      render json: vehicle, include: [:maint_events], status: 201
    else
      render json: { message: "Error - Vehicle not found" }, status: 400
    end
  end

  def update
    vehicle = set_vehicle

    if vehicle.update(vehicle_params)
      render json: vehicle, include: [:maint_events], status: 201
      #not sure I need to include maint_events on just updating the vehicle - REFACTOR
    else
      render json: { message: "Error - Vehicle not found" }, status: 400
    end

  end

private 
  def vehicle_params
    params.require(:vehicle).permit(:year, :make, :model, :color, :owner, :vin)
  end
  
  def set_vehicle
    vehicle = Vehicle.find_by_id(params[:id])
  end
  
end

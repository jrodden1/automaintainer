class MaintEventsController < ApplicationController
  
  def create
    process_completed_date_param_to_date_obj
    maint_event = MaintEvent.new(maint_event_params)

    if maint_event.save 
      render json: maint_event, status: 201
    else
      render json: { message: "Error(s): #{maint_event.errors.full_messages.join(", ")}" }, status: 400
    end

  end

  def show
    maint_event = set_maint_event

    if maint_event
      render json: maint_event, include: [:maint_events], status: 201
    else
      render json: { message: "Error - MaintEvent not found" }, status: 400
    end

  end

  def update
    maint_event = set_maint_event
    
    if maint_event.update(maint_event_params)
      render json: maint_event, status: 201
      #not sure I need to include maint_events on just updating the maint_event - REFACTOR
    else
      render json: { message: "Error(s): #{maint_event.errors.full_messages.join(", ")}" }, status: 400
    end

  end

private 

  def maint_event_params
    params.require(:maint_event).permit(:mileage, :completed, :event_type, :comment, :cost, :vehicle_id)
  end

  def process_completed_date_param_to_date_obj
    params[:maint_event][:completed] = Date.strptime(params[:maint_event][:completed], '%m/%d/%Y') 
  end
  
  
  def set_maint_event
    MaintEvent.find_by_id(params[:id])
  end
  
end

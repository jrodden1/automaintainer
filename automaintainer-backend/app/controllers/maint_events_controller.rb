class MaintEventsController < ApplicationController
  
  def create
    maint_event = MaintEvent.new(maint_event_params)

    if maint_event.save 
      render json: maint_event
    else
      render json: { message: "Error(s): #{maint_event.error.full_messages.join(", ")}" }
    end

  end

  def show
    maint_event = set_maint_event

    if maint_event
      render json: maint_event, include: [:maint_events]
    else
      render json: { message: "Error - MaintEvent not found" }
    end

  end

  def update
    maint_event = set_maint_event
    
    if maint_event.update(maint_event_params)
      render json: maint_event
      #not sure I need to include maint_events on just updating the maint_event - REFACTOR
    else
      render json: { message: "Error(s): #{maint_event.error.full_messages.join(", ")}" }
    end

  end

private 

  def maint_event_params
    params.require(:maint_event).permit(:mileage, :completed, :event_type, :comment, :cost, :vehicle_id)
  end
  
  def set_maint_event
    MaintEvent.find_by_id(params[:id])
  end
  
end

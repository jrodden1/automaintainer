class MaintEventsController < ApplicationController
  
  def create
    process_completed_date_param_to_date_obj
    maint_event = MaintEvent.new(maint_event_params)

    if maint_event.save 
      render json: maint_event, status: 201
    else
      render json: { message: "Error(s): #{maint_event.errors.full_messages}" }, status: 400
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
      render json: { message: "Error(s): #{maint_event.errors.full_messages}" }, status: 400
    end

  end

  def destroy
    maint_event = set_maint_event 
    maint_event_id = maint_event.id
    # REFACTOR - Could add an if statement here to see if the event destroys successfully and alternative message if it doesn't for some reason
    maint_event.destroy
    render json: { 
      message: "MaintEvent successfully destroyed",
      id: maint_event_id
    }
  end

private 

  def maint_event_params
    params.require(:maint_event).permit(:mileage, :completed, :event_type, :comment, :cost, :vehicle_id)
  end

  def process_completed_date_param_to_date_obj
    #Refactor needed- need to grab the users time zone and stick it in the params and then concat it at the end of completed instead of hard coding to -07:00
    params[:maint_event][:completed] = DateTime.strptime(params[:maint_event][:completed] + " -07:00", '%Y-%m-%d %z')
  end
  
  
  def set_maint_event
    MaintEvent.find_by_id(params[:id])
  end
  
end

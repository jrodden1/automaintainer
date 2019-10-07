# MaintEvents Migration
class CreateMaintEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :maint_events do |t|
      t.integer :mileage
      t.datetime :completed
      t.string :event_type
      t.text :comment
      t.float :cost
      t.integer :vehicle_id

      t.timestamps
    end
  end
end

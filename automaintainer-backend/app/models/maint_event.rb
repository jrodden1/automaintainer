class MaintEvent < ApplicationRecord
   belongs_to :vehicle

   validates :mileage, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 5000000}
   validates :event_type, presence: true
   validates :cost, presence: true, numericality: { greater_than_or_equal_to: 0.00 }
   validates :completed, presence: true
   #comment is optional
end

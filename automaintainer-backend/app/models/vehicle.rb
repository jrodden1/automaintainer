class Vehicle < ApplicationRecord
   has_many :maint_events

   validates :year, presence: true, numericality: { only_integer: true, less_than_or_equal_to: (Time.now.year + 1), greater_than_or_equal_to: 1875} #Only allows car dates between 1875 and Current Year + 1 (as auto mfg often release next year models in the fall of current year) 
   validates_presence_of :make, :model, :color
   #VIN and Owner are optional fields
   
end

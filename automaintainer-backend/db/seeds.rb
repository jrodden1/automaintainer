# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

honda = Vehicle.create(year: 1994, make: "Honda", model: "Accord", color: "Maroon")
truck = Vehicle.create(year: 1971, make: "Chevrolet", model: "Custom/10 Truck", color: "Gold")
nissan = Vehicle.create(year: 2004, make: "Nissan", model: "Xterra", color: "Black")

honda.maint_events.create(mileage: "112433", completed: Time.parse("Oct 15, 2009 10:00 -0600"), event_type: "Oil Change", cost: 35.22, comment:"First oil change after purchase of vehicle; used 5qts of High Mileage 5W-30")
honda.maint_events.create(mileage: "117788", completed: Time.parse("May 15, 2010 15:00 -0600"), event_type: "Oil Change", cost: 41.37, comment:"Oil change; used 5qts of High Mileage 5W-30")
honda.maint_events.create(mileage: "120980", completed: Time.parse("Jul 07, 2010 09:00 -0600"), event_type: "Clutch Slave Cylinder Replacement", cost: 157.10, comment:"Clutch Slave Cylinder went out.  Replaced with part from Advanced AutoParts - Lifetime Warranty under phone number: 970-555-1234")

truck.maint_events.create(mileage: "79766", completed: Time.parse("Jun 06, 1997 18:00 -0600"), event_type: "Flat Tire Repair", cost: 11.99, comment:"Flat Tire repaired by Pond Tire Co in Mt. Vernon. Flat caused by metal shard in the hay field.")

nissan.maint_events.create(mileage: "95234", completed: Time.parse("Mar 15, 2015 11:00 -0600"), event_type: "Oil Change", cost: 64.99, comment:"First oil change after purchase of vehicle; used 6qts of High Mileage 10W-30")
nissan.maint_events.create(mileage: "115223", completed: Time.parse("Dec 22, 2016 19:00 -0600"), event_type: "New Tires", cost: 789.67, comment:"New Tires, 4x Goodyear LT205/85 R17, 80,000mi Warranty from Pond Tire Company")
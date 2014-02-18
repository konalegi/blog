# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

djon = User.create!(name:'Djon',surname:'Malkovich',birthdate: Date.parse('2001-01-20'),sex:0,email:'djon.malkovich@mail.ru')
silv = User.create!(name:'Silvestor',surname:'Yanushev',birthdate: Date.parse('1980-01-20'),sex:0,email:'silvestor.yanushev@gmail.com')

Post.create!(text_data: 'here some text 1', title:'here some title 1',user_id:djon.id)
Post.create!(text_data: 'here some text 2', title:'here some title 2',user_id:djon.id)
Post.create!(text_data: 'here some text 3', title:'here some title 3',user_id:silv.id)
Post.create!(text_data: 'here some text 4', title:'here some title 4',user_id:silv.id)



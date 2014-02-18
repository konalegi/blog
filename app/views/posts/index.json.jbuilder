json.array!(@posts) do |post|

    json.signed post[:signed]
    json.id post[:id]
    json.created_at post[:created_at_formatted]
    json.title post[:title]
    json.text_data post[:text_data]
    json.user_name post[:user_name]



end

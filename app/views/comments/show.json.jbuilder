json.id comment.id,
json.comment comment.text_data,
json.user_name = comment.user.name
json.created_at = comment.created_at_formatted


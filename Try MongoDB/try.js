db.products.updateOne(
    {_id: 1},
    {$set: {
            'reviews': [
                {
                    'authorName': 'Syukri',
                    'rating': 4,
                    'review': 'Good value item!'
                },
                {
                    'authorName': 'Kamil',
                    'rating': 5,
                    'review': 'Easy to use.'
                }
            ]
        }
    }
)
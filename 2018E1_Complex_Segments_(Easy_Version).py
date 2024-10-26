# s = set(set([1,5], [2,4]), set([6,9], [8,10]))

s = [
    [
        [1,5], [2,4]
    ],
    [
        [6,9], [8,10]
    ]
]

ls = len(s)

for _ in s:
    print(len(_))

    for __ in _:
        print(len(__))

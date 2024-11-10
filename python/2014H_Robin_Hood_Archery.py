# t = int(input())

t = 3

for _ in range(t):
    n = random.randint(1, 4)
    points = []

    for _ in range(n):
        points.append(random.randint(1,2))
    
    q = random.randint(1,4)

    queries = []

    for _ in range(q):
        # 1<=l<=r<=n
        while True:
            l = random.randint(1, n)
            r = random.randint(l, n)
            if l < r:
                queries.append((l,r))
                break
    
    print(f'{n} {q}')
    print(' '.join(map(str, points)))

    for query in queries:
        print(' '.join(map(str, query)))

    results = []

    for query in queries:
        l, r = query
        li = l - 1
        ri = r
    
        targets = {}

        for i in range(li, ri):
            targets[i + 1] = points[i]
        
        sorted_targets = dict(sorted(targets.items(), key=lambda item: item[1], reverse=True))
        
        print(sorted_targets)

        robin_hood_score = 0
        sheriff_score = 0

        sheriff_turn = False

        for _, value in sorted_targets.items():
            if sheriff_turn == False:
                robin_hood_score += value
                sheriff_turn = True
            else:
                sheriff_score += value
                sheriff_turn = False
        
        if sheriff_score >= robin_hood_score:
            results.append('YES')
        else:
            results.append('NO')
    
    for result in results:
        print(result)


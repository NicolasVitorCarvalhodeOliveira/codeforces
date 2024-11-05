####################################################
#              2025D Attribute Checks              #
# https://codeforces.com/problemset/problem/2025/D #
# SOLUTION BY NÍCOLAS VÍTOR CARVALHO DE OLIVEIRA   #
# SOLVED IN 11/02/2024                             #
####################################################


# arr:list[int] = [0, 1, 0, 2, 0, -3, 0, -4, 0, -5]

num_records, total_points = map(int, input().split())
arr:list[int] = list(map(int, input().split()))

copy_arr = arr.copy()

check_points = 0
intelligence_points = 0
strength_points = 0

all_check_points = []


def get_type_check(index:int, l:list):
    if l[index] > 0:
        return "intelligence"
    else:
        return "strength"

def get_available_points(index:int, l:list):
    available_points = 0
    for item in l[:index]:
        if item == 0:
            available_points += 1
    return available_points

def mark_attribute_level_up(index:int, l:list, type_check:str, needed_points:int):
    added_points = 0
    for i in range(len(l[:index])):
        if l[i] == 0:
            if added_points < needed_points:
                l[i] = type_check
                added_points += 1

def get_check_points(l:list) -> list:
    check_points = []
    for i in range(len(l)):
        if l[i] != 0:
            check_points.append(i)
    return check_points




def score(index:int, l:list) -> list:
    global check_points, intelligence_points, strength_points

    type_check = get_type_check(index, l)

    if type_check == "intelligence":
        required_points = l[index]
        current_points = intelligence_points
        available_points = get_available_points(index, l)
        if current_points >= required_points:
            check_points += 1

        else:
            needed_points = required_points - current_points
            if available_points >= needed_points:
                mark_attribute_level_up(index, l, "I", needed_points)
                intelligence_points += needed_points
                check_points += 1

        
    elif type_check == "strength":
        required_points = abs(l[index])
        current_points = strength_points 
        available_points = get_available_points(index, l)
        if current_points >= required_points:
            check_points += 1

        else:
            needed_points = required_points - current_points
            if available_points >= needed_points:
                mark_attribute_level_up(index, l, "S", needed_points)
                strength_points += needed_points
                check_points += 1
        
    return copy_arr

def get_group(index:int, l:list) -> list:
    group = []
    i = index
    group.append(i)
    # temp = []
    for j in range(i + 1, len(l)):
        if j <= len(l) - 1:
            if l[j] != 0:
                group.append(j)
                # temp.append(j)

    # group.append(temp)

    # temp = []
    for j in range(len(l[:i])):
        if l[j] != 0:
            group.append(j)
            # temp.append(j)

    # if temp:
    #     group.append(temp)

    return group

def getGroup(i:int, j:int, l:list) -> list:
    group = []
    group.append(i)
    for k in range(j, len(l)):
        if k <= len(l) - 1:
            if l[k] != 0:
                group.append(k)

    for k in range(len(l[:j])):
        if l[k] != 0:
            if k not in group:
                group.append(k)
    return group


check_pointss = get_check_points(copy_arr)
groups = []
for i in range(len(check_pointss)):
    if i + 1 <= len(check_pointss) - 1:
        for j in range(i + 1, len(check_pointss)):
            group = getGroup(check_pointss[i], check_pointss[j], copy_arr)
            groups.append(group)

for group in groups:
    copy = copy_arr.copy()
    for i in range(len(group)):
        score(group[i], copy)

    all_check_points.append(check_points)
    check_points = 0
    intelligence_points = 0
    strength_points = 0



print(max(all_check_points))

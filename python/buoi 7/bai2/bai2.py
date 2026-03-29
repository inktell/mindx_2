import sys
import os

FI = 'input.txt'
FO = 'output.txt'

def solve():
    data = sys.stdin.read().split()
    if not data:
        return

    n = int(data[0])
    k = int(data[1])

    weights = [int(x) for x in data[2:]]
    weights.sort()  

    left = 0
    right = n - 1
    boats = 0

    while left <= right:
        
        if left == right:
            boats += 1
            break

        if weights[left] + weights[right] <= k:
            left += 1
            right -= 1
        else:
            right -= 1
        boats += 1

    sys.stdout.write(str(boats))

if __name__ == '__main__':
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, FI)

    if os.path.exists(file_path):
        sys.stdin = open(file_path, 'r')
        sys.stdout = open(os.path.join(current_dir, FO), 'w')
    solve()
import sys
import os

FI = 'input.txt'
FO = 'output.txt'

def solve():
    data = sys.stdin.read().split()
    
    if len(data) >= 2:
        n = int(data[0])
        m = int(data[1])

        a = list(map(int, data[2:2+n]))
        b = list(map(int, data[2+n:2+n+m]))

        i, j = 0, 0
        result = []


        while i < n and j < m:
            if a[i] <= b[j]:
                result.append(a[i])
                i += 1
            else:
                result.append(b[j])
                j += 1

        
        while i < n:
            result.append(a[i])
            i += 1

        while j < m:
            result.append(b[j])
            j += 1

        print(*result)


if __name__ == '__main__':
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, FI)

    if os.path.exists(file_path):
        sys.stdin = open(file_path, 'r')
        sys.stdout = open(os.path.join(current_dir, FO), 'w')

    solve()
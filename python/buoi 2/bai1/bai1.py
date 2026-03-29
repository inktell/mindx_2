import os
import sys

FI = 'bai2_inp.txt'

def solve():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    
    all_numbers = [int(x) for x in input_data]
    
    total = len(all_numbers)
    n = int(total**0.5)
    
    matrix = []
    for i in range(0, total, n):
        matrix.append(all_numbers[i : i + n])

    total_sum = 0
    
    for r in range(n):
        for c in range(n):
            if r == 0 or r == n - 1 or c == 0 or c == n - 1:
                total_sum += matrix[r][c]
                
    print(total_sum)

if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, FI)
    if os.path.exists(file_path):
        sys.stdin = open(file_path, 'r')
    solve()
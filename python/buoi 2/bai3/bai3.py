import os
import sys

FI = 'bai4_inp.txt'

def MatrixOptimization():
    data = list(map(int, sys.stdin.read().split()))
    
    if not data:
        return

    n = data[0]
    matrix_ = data[1:]

    matrix = [matrix_[i * n : (i + 1) * n] for i in range(n)]

    total_sum = 0

    for i in range(n):
        total_sum += matrix[i][i]
        
        if i != (n - 1 - i):
            total_sum += matrix[i][n - 1 - i]

    print(total_sum)

if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, FI)

    if os.path.exists(file_path):
        sys.stdin = open(file_path, 'r')
        MatrixOptimization()
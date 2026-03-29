import os
import sys

FI = "minmax.txt"

def minmax():
    data = sys.stdin.read().split()

    if not data:
        return
    
    n = int(data[0])
    numbers = list(map(int, data[1:n+1]))
    
    if not numbers:
        return
    
    print(max(numbers), min(numbers))

if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, FI)
    
    if os.path.exists(file_path):
        sys.stdin = open(file_path, 'r')
    minmax()
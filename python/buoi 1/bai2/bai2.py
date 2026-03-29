import sys
import os

FI = "lixi.txt"

def solve():
    data = sys.stdin.read().split()

    if not data:
        return
    
    n = int(data[0])
    amounts = map(int, data[1:n+1])
    print(sum(amounts))

if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, FI)
    
    if os.path.exists(file_path):
        sys.stdin = open(file_path, 'r')
    solve()
import sys
import os

A = 'text1.txt'
B = 'text2.txt'

def solve():
    data = sys.stdin.read().split();

    if len(data) >= 2:
        a = int(data[0])
        b = int(data[1])
        print(a+b)
if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, A)

    if os.path.exists(file_path):
        sys.stdin = open(file_path, 'r')
        sys.stdout = open(os.path.join(current_dir, B), 'w')
        solve()
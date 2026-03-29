import os
import sys

FI = 'bai3_inp.txt'
FO = 'bai3_out.txt'

def listComprehension():
    data = list(map(int, sys.stdin.read().split()))
    
    if len(data) < 2:
        return

    n = data[0]
    k = data[1]
    a = data[2:2+n]

    result = [x for x in a if x % k == 0]

    print(*(result))

if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, FI)

    if os.path.exists(file_path):
        sys.stdin = open(file_path, 'r')
        sys.stdout = open(os.path.join(current_dir, FO), 'w')
    listComprehension()
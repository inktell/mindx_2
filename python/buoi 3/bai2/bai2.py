import os
import sys

FI = 'bai3_inp.txt'

def StringTraversal():
    s = sys.stdin.read().strip()
    if not s:
        return
    res = ""
    n = len(s)
    count = 1
    for i in range(n):
        if i + 1 < n and s[i] == s[i+1]:
            count += 1
        else:
            res += s[i] + str(count)
            count = 1
    print(res)

if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, FI)
    if os.path.exists(file_path):
        sys.stdin = open(file_path, 'r')
    StringTraversal()
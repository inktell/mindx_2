import sys
import os

FI = 'bai5_inp.txt'
FO = 'bai5_out.txt'

def solve_tet_palindrome():
    data = sys.stdin.read().split()
    if not data:
        return
    
    s = data[0]
    n = len(s)
    max_len = 0

    for i in range(n):
        for j in range(i, n):
            sub = s[i:j+1]
            if sub == sub[::-1]:
                if len(sub) > max_len:
                    max_len = len(sub)
    
    print(max_len, end='')

if __name__ == '__main__':
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path_1 = os.path.join(current_dir, FI)
    file_path_2 = os.path.join(current_dir, FO)

    if os.path.exists(file_path_1):
        sys.stdin = open(file_path_1, 'r')
        sys.stdout = open(file_path_2, 'w')
        solve_tet_palindrome()
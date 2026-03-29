import sys
import os

def Đẹp():
    s = input().strip()
    k = int(input())
    
    n = len(s)
    if k > n:
        print(0)
        return

    count_x = 0
    Dẹp_count = 0

    for i in range(k):
        if s[i] == 'x':
            count_x += 1
    
    if count_x == 0:
        Dẹp_count += 1

    for i in range(k, n):
        if s[i - k] == 'x':
            count_x -= 1
        
        if s[i] == 'x':
            count_x += 1
            
        if count_x == 0:
            Dẹp_count += 1

    print(Dẹp_count)

if __name__ == '__main__':
    Đẹp()
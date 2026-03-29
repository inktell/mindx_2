# # # Kỹ thuật 2 con trỏ(TWO POINTERS)

# L,R = 0, n - 1
# while L < R:
#     S = A[L] + A[R]
#     if S == K:
#         print("Found",A[L],A[R])
#         break
#     elif S < K:
#         L += 1 # tăng tổng
#     else:
#         R -= 1 # giảm tổng

# # # section 1: Vòng lặp đối kháng
# C = []
# i, j = 0, 0
# while i < len(A) and j < len(B): # Vòng lặp đối kháng
#     if A[i] < B[j]:
#         C.append(A[i])
#         i += 1
#     else:
#         C.append(B[j])
#         j += 1

# # # section 2: Gom phần dư
# #gom phần dư(chỉ 1 trong 2 vòng lặp này chạy)
# while i < len(A):
#     C.append(A[i])
#     i += 1
# while j < len(B):
#     C.append(B[j])
#     j += 1

import sys
import os

FI = "input.txt"
FO = "output.txt"

def TwoPointers():
    line1 = sys.stdin.readline().split()
    if not line1:
        return
    n = int(line1[0])
    k = int(line1[1])

    a = list(map(int, sys.stdin.readline().split()))

    l = 0
    r = n - 1
    found = False

    while l < r:
        current_sum = a[l] + a[r]
        if current_sum == k:
            found = True
            break
        elif current_sum < k:
            l += 1
        else:
            r -= 1
            
    if found:
        sys.stdout.write("YES\n")
    else:
        sys.stdout.write("NO\n")

if __name__ == '__main__':
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path_1 = os.path.join(current_dir, FI)
    file_path_2 = os.path.join(current_dir, FO)
    
    if os.path.exists(file_path_1):
        sys.stdin = open(file_path_1, 'r')
        sys.stdout = open(file_path_2, 'w')
        TwoPointers()
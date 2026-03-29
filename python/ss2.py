# A = {-1, 2, 3, 4, 5}

# # 1. Sử dụng list comprehension để tạo một danh sách mới chứa các phần tử dương của A, sau đó đảo ngược danh sách đó.
# B = [x for x in A if x > 0][::-1]

# print(B)

# #  Ma Trận
# R = len(matrix)
# C = len(matrix[0])
# for i in range(R):
#     for j in range(C):
#         print(matrix[i][j], end=' ')
#     print()



# import sys
# import os

# FI = 'text1.txt'

# def solve():
#     input_data = sys.stdin.read().split()
#     if not input_data:
#         return
    
#     all_numbers = [int(x) for x in input_data]

#     k = all_numbers[-1]

#     a = all_numbers[:-1]

#     n = len(a)

#     if n == 0:
#         print()
#         return
    
#     k = k % n

#     new_arr = a[k:] + a[:k]

#     print(*new_arr)

# if __name__ == "__main__":
#     current_dir = os.path.dirname(os.path.abspath(__file__))
#     file_path = os.path.join(current_dir, FI)
#     if os.path.exists(file_path):
#         sys.stdin = open(file_path, 'r')
#     solve()
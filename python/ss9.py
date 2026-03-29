# freq = {}
# for x in A:
#     if x in freq:
#         freq[x] += 1
#     else:
#         freq[x] = 1

# # #-----------------------------------------------------------------

# def two_sum_hashing(A, K):
#     # khởi tạo sổ ghi chép(Dictionary)
#     # Key = Giá trị của con số, Value = vị trí (index) của con số đó
#     da_duyet = {}

#     # chỉ dùng 1 vòng lặp duy nhát: O(N)
#     for i in range(len(A)):
#         X = A[i]

#         # Mảnh ghép còn thiếu cần tìm là Y
#         Y = K -X

#         # Phép thuật Hashing: Tra cứu O(1) xem Y đã xuất hiện trong quá khứ chưa?
#         if Y in da_duyet:
#             # Nếu đã từng gặp Y, ta tìm thấy đáp án!
#             # Trả về vị trí của Y (trong sổ) và vị trí của x(hiện tại)            
#             return [da_duyet[Y], i]

#         # Nếu chưa gặp Y, ta ghi con sổ X hiện tại vào sổ để các sổ sau này tra cứu
#         da_duyet[X] =i
#     return "Không tìm thấy"

# # ------ chạy thử nghiệm-----------
# A_test = [6, 1, 4, 2, 7]
# K_test = 8

# print(f"Mảng {A_test}, Cần tìm tổng K = {K_test}")
# ket_qua = two_sum_hashing(A_test,K_test)
# print(f"Vị trí của 2 số cần tìm là: {ket_qua}")

# # # --------------------------------------

# import sys
# import os

# FI = 'input.txt'
# FO = 'output.txt'

# def solve():
#     data = sys.stdin.read().split()
#     if not data: return

#     n = int(data[0])
#     # cắt lấy mảng chứa các mã tem
#     stamps = data[1 : 1+n]

#     #ép kiểu list sang set để loại bỏ toàn bộ phần tử trùng lặp trong O(N)
#     unique_stamps = set(stamps)

#     #in ra số lượng phần tử của set
#     sys.stdout.write(str(len(unique_stamps)) + '\n')

# if __name__ == '__main':
#     current_dir = os.path.dirname(os.path.abspath(__file__))
#     file_path_1 = os.path.join(current_dir, FI)
#     file_path_2 = os.path.join(current_dir, FO)
#     if os.path.exists(file_path_1):
#         sys.stdin = open(file_path_1, 'r')
#         sys.stdout = open(file_path_2, 'w')
#     solve()

# # #-----------------------------------------------------

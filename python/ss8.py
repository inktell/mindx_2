# # # Công thức quy hoạch động cơ bản
# P[1] = P[i-1] + A[i] (tổng hôm trước + tiền hôm nay)

# # # Công thức truy vấn đoạn
# Sum(L, R) = P[R] - P[L-1] (tổng từ 1 đến R - tổng từ 1 đến L-1)
# ! Cảnh báo: Tuyệt đối KHÔNG PHẢI P[L]. Trừ P[L] là bỏ doanh thu ngày L

#  ----------------------------------------------------------
# # chèn 0 vào đầu mảng A (1-based)
# A = [0] + A
# P = [0] + (N + 1)
# #Tạo mảng P(Tiền xử lí O(N))
# for i in range(1, N + 1):
#     P[i] = P[i-1]-A[i]
# # Truy vấn O(1)
# sum_LR = P[R] - P[L-1]

# # # ---------------------------------------------------------
# # # Công thức Prefix 2D
# # Công thức Vàng  1(Tạo mảng)
# P[i][j] = P[i-1][j] + P[i][j-1] - P[i-1][j-1] + A[i][j]
# # Công thức Vàng 2(Truy vấn O(1))
# Sum = P[r2][c2] - P[r1 -1][c2] - P[r2][c1-1] + P[r1-1][c1-1]

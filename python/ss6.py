# # -----------------------------Tư duy chặt đôi & độ phức tạp 
# mid = (L + R) // 2

# def binary_search(arr, target):
#     L, R = 0, len(arr) - 1 # khởi tạo L và R bao trùm mảng
#     while L <= R: # Vòng lặp: while L <= R(lưu ý dấu =)
#         mid = (L + R) // 2 # điểm giữa: mid(L + R) // 2
#         if arr[mid] == target: # thu hẹp: rời L hoặc R để loại bỏ nửa mảng
#             return mid
#         elif arr[mid] < target:
#             L = mid + 1
#         else:
#             R = mid - 1
#     return -1

# # # ---------------------------------
# import bisect
# idx = bisect.bisect_left(arr,x) # tìm vị trí chèn bên trái
# idx = bisect.bisect_right(arr,x) # tìm vị trí chèn bên phải

# import bisect
# arr = [1,3,5,5,5,8,10]
# i = bisect.bisect_left(arr,5)
# j = bisect.bisect_right(arr,5)
# print(i)
# print(j)

# import bisect
# A = [2,5,10,15,20,50,50,70,100]
# left = bisect.bisect_left(A,10)
# right = bisect.bisect_right(A,50)
# count = right - left
# print(f"Số phần tử bằng: {count}")




# # # ----------------------------------------------------------------------------------------------
# # Merge Sort: O(n log n)
# def merge_sort(arr):
#     if len(arr) <= 1:
#         return arr
#     mid = len(arr) // 2
#     left_half = merge_sort(arr[:mid])
#     right_half = merge_sort(arr[mid:])
#     return merge(left_half, right_half)

# # Insertion Sort: O(n^2)
# def insertion_sort(arr):
#     for i in range(1, len(arr)):
#         key = arr[i]
#         j = i - 1
#         while j >= 0 and arr[j] > key:
#             arr[j + 1] = arr[j]
#             j -= 1
#         arr[j + 1] = key
#     return arr

# # Selection Sort: O(n^2)
# def selection_sort(arr):
#     n = len(arr)
#     for i in range(n):
#         min_index = i
#         for j in range(i + 1, n):
#             if arr[j] < arr[min_index]:
#                 min_index = j
#         arr[i], arr[min_index] = arr[min_index], arr[i]
#     return arr

# # Bubble Sort: O(n^2)
# def bubble_sort(arr):
#     n = len(arr)
#     for i in range(n):
#         for j in range(0, n - i - 1):
#             if arr[j] > arr[j + 1]:
#                 arr[j], arr[j + 1] = arr[j + 1], arr[j]
#     return arr


# tổng kết:
# 1.Merge Sort: chia dãy thành 2 nửa để sắp xếp từng nửa rồi gộp lại thành dãy đã sắp xếp
# 2.Insertion Sort: sắp xếp các phần tử trg dãy đúng về vị trí từ bé đến lớn hoặc ngược lại
# 3.Selection Sort: đảo vị trí để sắp xếp lại theo hướng từ bé đến lớn và ngược lại
# 4.Bubble Sort: chia nửa dãy để sắp xếp từng phần tử trong nửa dãy đã chia theo hướng từ bé đến lớn và ngược lại

# # # ----------------------------------------------------------------------------------------------
# # # Quy trình thực hiện 4 bước
# # bước 1: xác định miền nghiệm[L,R]:
# L: giá trị nhỏ nhất có thể của đáp án
# R: giá trị lớn nhất có thể của đáp án(thường là tổng mảng hoặc $10^{18}$)
# # bước 2: chặt đôi miền nghiệm:
# tính mid=(L + R) //2 là giá trị "đáp án giả định"mà ta muốn kiểm tra
# # bước 3: Viết hàm check(mid)
# Đây là phần khó nhất: kiểm tra xem với đáp án là mid, ta có thể thỏa mãn điểu kiện đề bài không? ()

# # #----------------------------------------------------------------------------------------------


import sys
# 1.xác định phạm vi
L,R = 0, 10**18
ans = -1
# 2.hàm kiểm tra
def check(val):
    # logic riêng của bài toán
    return True # hoặc False

# 3.Chặt nhị phân
while L <= R:
    mid = (L + R) // 2
    if check(mid):
        ans = mid # ghi nhận
        R = mid - 1 # thử tìm tốt hơn
    else:
        L = mid + 1 # giảm phạm vi
print(ans)
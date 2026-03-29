# LCM(A,B) = A * B / GCD(A,B)
# GCD(A,B) = GCD(B, A(mod B))
# LCM : Bội chung nhỏ nhất
# GCD : Ước chung lớn nhất

# import math

# a = 252
# b = 105
# print(f"GCD({a}, {b}) = {math.gcd(a, b)}")
# print(f"LCM({a}, {b}) = {math.lcm(a, b)}")
# print(f"LCM({a}, {b}) = {a * b // math.gcd(a, b)}") # Cách tính LCM bằng cách sử dụng GCD

# những dấu hiệu nhận biết tìm ước chung lớn nhất và bcnn:
# nhận diện: lớn nhất, chia đều, cắt nhỏ nhất, đông bộ, ko dư
# BCNN: ít nhất, lặp lại, cùng lúc, gặp lại nhau, chu kì,

# -------------------------------

# import math

# def get_divisors(n):
#     divisors = []
#     # chỉ duyệt đến căn bậc hai của n
#     for i in range(1, int(math.sqrt(n)) + 1):
#         if n % i == 0:  # nếu i là ước của n
#             divisors.append(i)  # thêm i vào danh sách ước
#             if i*i != n:  # nếu i không phải là căn bậc hai của n
#                 divisors.append(n // i)  # thêm n//i vào danh sách ước
#     return sorted(divisors)  # trả về danh sách ước đã được sắp xếp

# ----------------------------------

## số chính phương
# công thức: int(n**0.5)**2 == n
## số hoàn hảo
# công thức: n == sum of divisors of n (trừ n)

# -----------------------------------------------

# import math
# import math

# a = int(input("Nhập số a: "))
# b = int(input("Nhập số b: "))

# def divisors(a,b):
#     divisors_a = set()
#     divisors_b = set()

#     for i in range(1, int(math.sqrt(a)) + 1):
#         if a % i == 0:
#             divisors_a.add(i)
#             if i*i != a:
#                 divisors_a.add(a // i)

#     for j in range(1, int(math.sqrt(b)) + 1):
#         if b % j == 0:
#             divisors_b.add(j)
#             if j*j != b:
#                 divisors_b.add(b // j)

#     common_divisors = divisors_a.intersection(divisors_b)
#     return sorted(common_divisors)
# print(math.gcd(a, b))

# -----------------------------------------------

import math
import sys


def get_divisors():
    divisors = sys.stdin.readline().strip()
    if not divisors:
        return []
    n = int(divisors)
    divisors = []

    # chỉ duyệt đến căn bậc hai của n
    for i in range(1, int(math.sqrt(n)) + 1):
        if n % i == 0:  # nếu i là ước của n
            divisors.append(i)  # thêm i vào danh sách ước
            if i*i != n:  # nếu i không phải là căn bậc hai của n
                divisors.append(n // i)  # thêm n//i vào danh sách ước
    return sorted(divisors)  # trả về danh sách ước đã được sắp xếp

if __name__ == '__main__':
    divisors = get_divisors()
    print(f"Ước của n: {divisors}")

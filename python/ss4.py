# Định lí: mọi số tự nhiên N > 1 đều có thể phân tích  thành tích của các thừa số nguyên tố:
# N = p1^a1 * p2^a2 * ... * pk^ak
# VD: 60 = 2^2 * 3^1 * 5^1
# 18 = 2^1 * 3^2
# 50 = 2^1 * 5^2
# 36 = 2^2 * 3^3
# 68 = 2^2 * 17^1
# 99 = 3^2 * 11^1
# 16 = 2^4
# 42 = 2^1 * 3^1 * 7^1
# 70 = 2^1 * 5^1 * 7^1
# 100 = 2^2 * 5^2
# 180 = 2^2 * 3^3 * 5^1
# 210 = 2^1 * 3^1 * 5^1 * 7^1

def factorize(n):
    factors = {}
    d = 2
    temp = n
    while d * d <= temp:
        while temp % d == 0:
            if d in factors:
                factors[d] += 1
            else:
                factors[d] = 1
            temp //= d
        d += 1
    if temp > 1:
        print(temp)
import math
import sys

def solve_den_hung():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    
    n = int(input_data[0])
    a = list(map(int, input_data[1:]))

    current_gcd = a[0]
    for i in range(1, n):
        current_gcd = math.gcd(current_gcd, a[i])

    ket_qua = []
    for k in range(2, current_gcd + 1):
        if current_gcd % k == 0:
            ket_qua.append(k)
    
    print(ket_qua)

if __name__ == "__main__":
    solve_den_hung()
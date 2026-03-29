import sys


def slove_uoc():
    input_data = sys.stdin.readline().split()
    if len(input_data) < 2: 
        return

    a = int(input_data[0])
    b = int(input_data[1])

    def tinh_tong(n):
        tong = 0
        for i in range(1, n):
            if n % i == 0:
                tong += i
        return tong

    tong_a = tinh_tong(a)
    tong_b = tinh_tong(b)

    if tong_a == b and tong_b == a:
        print(f"YES (Tổng ước {a} là {b} và ngược lại)")
    else:
        print("NO")

if __name__ == "__main__":
    slove_uoc()
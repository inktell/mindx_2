import sys, os

def solve():
    # Đọc nhanh toàn bộ dữ liệu
    data = sys.stdin.read().split()
    if not data: return
    
    n, x = int(data[0]), int(data[1])
    a = list(map(int, data[2:]))
    
    # Cài đặt Binary Search chuẩn O(log N)
    low, high = 0, n - 1
    found = False
    
    while low <= high:
        mid = (low + high) // 2
        if a[mid] == x:
            found = True
            break
        elif a[mid] < x:
            low = mid + 1
        else:
            high = mid - 1
            
    sys.stdout.write("YES\n" if found else "NO\n")

if __name__ == "__main__":
    FI, FO = 'bai1_inp.txt', 'bai1_out.txt'
    if os.path.exists(FI):
        sys.stdin, sys.stdout = open(FI, 'r'), open(FO, 'w')
    solve()
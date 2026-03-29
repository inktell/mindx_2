import sys, os

def check(h, m, a):
    """Tính tổng gỗ thu được nếu đặt máy cưa ở độ cao h"""
    total = 0
    for tree in a:
        if tree > h:
            total += (tree - h)
    return total >= m

def solve():
    data = sys.stdin.read().split()
    if not data: return
    
    n, m = int(data[0]), int(data[1])
    a = list(map(int, data[2:]))
    
    # Chặt nhị phân trên độ cao máy cưa [0...max_height]
    low, high = 0, max(a)
    ans = 0
    
    while low <= high:
        mid = (low + high) // 2
        if check(mid, m, a):
            ans = mid
            low = mid + 1 # Thỏa mãn, thử tăng độ cao để lấy ít gỗ hơn
        else:
            high = mid - 1 # Không đủ gỗ, phải hạ máy cưa xuống
            
    sys.stdout.write(str(ans) + '\n')

if __name__ == "__main__":
    FI, FO = 'bai2_inp.txt', 'bai2_out.txt'
    if os.path.exists(FI):
        sys.stdin, sys.stdout = open(FI, 'r'), open(FO, 'w')
    solve()
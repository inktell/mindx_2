import sys, os

def check(dist, k, a):
    """Kiểm tra xem có thể đặt k trạm với khoảng cách tối thiểu dist không"""
    count = 1
    last_pos = a[0]
    
    for i in range(1, len(a)):
        if a[i] - last_pos >= dist:
            count += 1
            last_pos = a[i]
            if count >= k: return True
    return False

def solve():
    data = sys.stdin.read().split()
    if not data: return
    
    n, k = int(data[0]), int(data[1])
    # Mảng vị trí cần được sắp xếp để dùng Greedy
    a = sorted([int(x) for x in data[2:]])
    
    low = 1
    high = a[-1] - a[0]
    ans = 1
    
    while low <= high:
        mid = (low + high) // 2
        if check(mid, k, a):
            ans = mid
            low = mid + 1 # Khoảng cách này ổn, thử tăng thêm xem sao
        else:
            high = mid - 1 # Khoảng cách quá lớn, không đặt đủ k trạm
            
    sys.stdout.write(str(ans) + '\n')

if __name__ == "__main__":
    FI, FO = 'tram5g.inp', 'tram5g.out'
    if os.path.exists(FI):
        sys.stdin, sys.stdout = open(FI, 'r'), open(FO, 'w')
    solve()
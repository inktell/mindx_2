import sys, os

def solve():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    
    # Tìm x lớn nhất sao cho x*x <= n
    low, high = 0, 10**9 # Vì n <= 10^18 nên x tối đa là 10^9
    ans = 0
    
    while low <= high:
        mid = (low + high) // 2
        if mid * mid <= n:
            ans = mid
            low = mid + 1
        else:
            high = mid - 1
            
    sys.stdout.write(str(ans) + '\n')

if __name__ == "__main__":
    FI, FO = 'canphong.inp', 'canphong.out'
    if os.path.exists(FI):
        sys.stdin, sys.stdout = open(FI, 'r'), open(FO, 'w')
    solve()
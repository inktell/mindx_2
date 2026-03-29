import sys

def solve_mat_ma():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    
    n = int(input_data[0])
    a = list(map(int, input_data[1:]))
    
    max_val = max(a)
    
    count = [0] * (max_val + 1)
    for x in a:
        count[x] += 1
        
    for g in range(max_val, 0, -1):
        boi = 0
        
        for multiple in range(g, max_val + 1, g):
            boi += count[multiple]

            if boi >= 2:
                print(f"{g} (cặp số có GCD = {g} là lớn nhất)")
                return

if __name__ == "__main__":
    solve_mat_ma()
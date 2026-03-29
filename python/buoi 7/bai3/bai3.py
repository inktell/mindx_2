import sys
import os

FI = 'input.txt'
FO = 'output.txt'

def solve():
    # Đọc và tách dữ liệu, loại bỏ khoảng trắng thừa
    data = sys.stdin.read().split()
    
    # Kiểm tra tối thiểu phải có N và S
    if len(data) < 2:
        return
    
    try:
        n = int(data[0])
        s = int(data[1])
        
        # SỬA LỖI TẠI ĐÂY: 
        # Thay vì lấy cố định từ 2 đến 2+n, ta lấy tất cả từ vị trí thứ 2 trở đi
        # Điều này giúp tránh IndexError nếu file input bị thiếu số
        a = [int(x) for x in data[2:]]
        
        # Cập nhật lại n theo số lượng thực tế đọc được để vòng lặp không bị quá chỉ số
        n = len(a)
        
    except ValueError:
        # Nếu dữ liệu không phải là số, thoát để tránh lỗi tính toán
        return

    # Thuật toán Hai con trỏ
    a.sort()
    found = False
    
    # Duyệt i từ 0 đến n-3 (vì cần ít nhất 3 số)
    for i in range(n - 2):
        target = s - a[i]
        left = i + 1
        right = n - 1
        
        while left < right:
            current_sum = a[left] + a[right]
            if current_sum == target:
                found = True
                break
            elif current_sum < target:
                left += 1
            else:
                right -= 1
        
        if found:
            break
            
    if found:
        sys.stdout.write("YES")
    else:
        sys.stdout.write("NO")

if __name__ == '__main__':
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path_1 = os.path.join(current_dir, FI)
    file_path_2 = os.path.join(current_dir, FO)
    if os.path.exists(file_path_1):
        sys.stdin = open(file_path_1, 'r')
        sys.stdout = open(file_path_2, 'w')
    solve()
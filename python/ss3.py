# xử lí xâu chuỗi(tring) | chuỗi con

# ord('a') # trả về mã ascii của kí tự 'a'
# ord('A') # trả về mã ascii của kí tự 'A'
# # trả về mã ascii của kí tự 'a' là 97
# # trả về mã ascii của kí tự 'A' là 65
# chr(97) # trả về kí tự có mã ascii là 97
# chr(65) # trả về kí tự có mã ascii là 65
# # trả về kí tự có mã ascii là 97 là 'a'
# # trả về kí tự có mã ascii là 65 là 'A'





import sys
import os

FI = 'bai1_inp.txt'
FO = 'bai1_out.txt'

def solve():
    input_data = sys.stdin.read().strip()
    if not input_data:
        return
    
    s = input_data[0]
    k = int(input_data[1])

    result = []
    for char in s:
        # Chỉ xử lý ký tự từ 'a' đến 'z'
        if 'a' <= char <= 'z':
            # Đổi từ ký tự sang số (0-25)
            original_pos = ord(char) - ord('a')
           
            # Cộng thêm K và xoay vòng (modulo 26)
            new_pos = (original_pos + k) % 26
           
            # Đổi ngược lại từ số sang ký tự
            new_char = chr(new_pos + ord('a'))
            result += new_char
        else:
            result += char
           
    print(result)

if __name__ == '__main__':
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path_1 = os.path.join(current_dir, FI)
    file_path_2 = os.path.join(current_dir, FO)
    if os.path.exists(file_path_1):
        sys.stdin = open(file_path_1, 'r')
        sys.stdout = open(file_path_2, 'w')
    solve()
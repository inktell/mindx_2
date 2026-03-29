import os
import sys

def PalindromeCheck():
    s = sys.stdin.readline().strip()
    if not s:
        return
    if s == s[::-1]:
        print("YES")
    else:
        print("NO")

if __name__ == "__main__":
    PalindromeCheck()
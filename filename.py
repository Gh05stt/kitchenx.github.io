import os

dir_list = os.listdir('Test')
count = 5
    
for x in dir_list:
    new_name = str(count)+'.jpeg'
    os.rename(f'Test/{x}', f'Test/{new_name}')
    count += 1
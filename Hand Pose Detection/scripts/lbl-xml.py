import xml.etree.ElementTree as ET
import os
#letter = 
def num(filename):
    return filename.split(".")[1]

with open('D:/Pose Detection/HandPose/Images/skeletons/train/N.xml', 'r') as f: 
    data = f.read()

FOLDER = 'D:/Pose Detection/HandPose/Images/skeletons/train/N'

for filename in os.listdir(FOLDER):
    
    number = num (filename)
    with open('D:/Pose Detection/HandPose/Images/Annotations/N/N.{}.xml'.format(number), 'w') as fp:
        fp.write(data)
    tree = ET.parse('D:/Pose Detection/HandPose/Images/Annotations/N/N.'+ str(number) +'.xml')
    root = tree.getroot()

    BBB = root.find('filename')
    BBB.text = 'N.'+str(number) +'.jpg'

    AAA = root.find('path')
    AAA.text = 'D:\Pose Detection\HandPose\Images\skeletons\train\N\N.' +str(number)+ '.jpg'

    tree.write('D:/Pose Detection/HandPose/Images/Annotations/N/N.'+ str(number) +'.xml')
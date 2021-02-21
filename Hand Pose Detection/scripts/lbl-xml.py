import xml.etree.ElementTree as ET
import os


def num(filename):
    return filename.split(".")[1]

with open('D:/Pose Detection/HandPose/Images/skeletons/train/N.xml', 'r') as f: 
    data = f.read()

FOLDER = 'D:/Pose Detection/HandPose/Images/skeletons/train/N'

for filename in os.listdir(FOLDER):
    letter = filename[0]    
    number = num (filename)
    with open('D:/Pose Detection/HandPose/Images/Annotations/{}/{}.{}.xml'.format(letter,letter,number), 'w') as fp:
        fp.write(data)
    tree = ET.parse('D:/Pose Detection/HandPose/Images/Annotations/{}/{}.'.format(letter,letter)+ str(number) +'.xml')
    root = tree.getroot()

    BBB = root.find('filename')
    BBB.text = 'N.'+str(number) +'.jpg'

    AAA = root.find('path')
    pat = str(r'D:\Pose Detection\HandPose\Images\skeletons\train\{}\{}.'.format(letter,letter) +str(number)+ '.jpg')
    AAA.text = pat

    tree.write('D:/Pose Detection/HandPose/Images/Annotations/{}/{}.'.format(letter,letter)+ str(number) +'.xml')


import xml.etree.ElementTree as ET
import os


def num(filename):
    return filename.split(".")[1]

with open('D:/Pose Detection/HandPose/Images/skeletons/train/Q.xml', 'r') as f: 
    data = f.read()

FOLDER = 'D:/Pose Detection/HandPose/Images/skeletons/train/Q'

for filename in os.listdir(FOLDER):
    letter = filename[0]    
    number = num (filename)
    with open('D:/Pose Detection/HandPose/Images/Annotations/{}/{}.{}.xml'.format(letter,letter,number), 'w') as fp:
        fp.write(data)
    tree = ET.parse('D:/Pose Detection/HandPose/Images/Annotations/{}/{}.'.format(letter,letter)+ str(number) +'.xml')
    root = tree.getroot()

    GGG = root.find('folder')
    GGG.text = letter
    BBB = root.find('filename')
    BBB.text = '{}.'.format(letter)+str(number) +'.jpg'

    AAA = root.find('path')
    pat = str(r'D:\Pose Detection\HandPose\Images\skeletons\train\{}\{}.'.format(letter,letter) +str(number)+ '.jpg')
    AAA.text = pat
    CCC = root.find('object')
    FFF = CCC.find('name')
    FFF.text = letter
    tree.write('D:/Pose Detection/HandPose/Images/Annotations/{}/{}.'.format(letter,letter)+ str(number) +'.xml')


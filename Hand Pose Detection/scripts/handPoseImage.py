from __future__ import division
import cv2
import time
import argparse
import numpy as np
import os
from PIL import Image, ImageEnhance

protoFile = "hand/pose_deploy.prototxt"
weightsFile = "hand/pose_iter_102000.caffemodel"
nPoints = 22
POSE_PAIRS = [ [0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[0,9],[9,10],[10,11],[11,12],[0,13],[13,14],[14,15],[15,16],[0,17],[17,18],[18,19],[19,20] ]
net = cv2.dnn.readNetFromCaffe(protoFile, weightsFile)
FOLDER = "Images/originals/train/A"

for filename in os.listdir(FOLDER):
    image = cv2.imread(os.path.join(FOLDER,filename))
    if image is not None:
        letter = filename[0]
        number = filename.split(".")[0][1:]
        frame = image
        frameCopy = np.copy(frame)
        frameWidth = frame.shape[1]
        frameHeight = frame.shape[0]
        aspect_ratio = frameWidth/frameHeight

        threshold = 0.1

        t = time.time()
        # input image dimensions for the network
        inHeight = 368
        inWidth = int(((aspect_ratio*inHeight)*8)//8)
        inpBlob = cv2.dnn.blobFromImage(frame, 1.0 / 255, (inWidth, inHeight), (0, 0, 0), swapRB=False, crop=False)

        net.setInput(inpBlob)

        output = net.forward()
        print("time taken by network : {:.3f}".format(time.time() - t))

        points = []

        for i in range(nPoints):

            # confidence map of corresponding body's part.
            probMap = output[0, i, :, :]
            probMap = cv2.resize(probMap, (frameWidth, frameHeight))

            # Find global maxima of the probMap.
            minVal, prob, minLoc, point = cv2.minMaxLoc(probMap)

            if prob > threshold :
                cv2.circle(frameCopy, (int(point[0]), int(point[1])), 8, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
                cv2.putText(frameCopy, "{}".format(i), (int(point[0]), int(point[1])), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2, lineType=cv2.LINE_AA)

                # Add the point to the list if the probability is greater than the threshold
                points.append((int(point[0]), int(point[1])))
            else :
                points.append(None)
        
        if points.count(None) < 3:
            back = cv2.imread("bg.jpg")

            for pair in POSE_PAIRS:
                partA = pair[0]
                partB = pair[1]

                if points[partA] and points[partB]:
                    cv2.line(back, points[partA], points[partB], (0, 255, 255), 1)
                    cv2.circle(back, points[partA], 3, (0, 0, 255), thickness=-1, lineType=cv2.FILLED)
                    cv2.circle(back, points[partB], 3, (0, 0, 255), thickness=-1, lineType=cv2.FILLED)

            cv2.imwrite("Images/skeletons/train/" + letter + "/" + letter + "." + number + ".jpg", back)
            
            #cv2.imwrite("Images/skeletons/train/C/" + letter + number + ".jpg", back)
            print("Total time taken : {:.3f}".format(time.time() - t), number)

        cv2.waitKey(0)
